import React, { FormEvent, useContext, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../AccountsTab.module.css";
import AuthContext, { getCSRFToken } from "../../../context/AuthContext";
import axios from "axios";
import { API_CREATE_ACCOUNT_URL } from "../../../constants";

export enum AccountType {
  checking = "CHECKING",
  savings = "SAVINGS",
}

export interface AccountCreationProperties {
  account_type: AccountType;
  name: string;
}

const defaultAccountInfo: AccountCreationProperties = {
  account_type: AccountType.checking,
  name: "",
};

const CreateAccountForm = ({
  toggle,
  fetchAccountsData,
}: {
  toggle: () => void;
  fetchAccountsData: () => void;
}) => {
  const [accountInfo, setAccountInfo] =
    useState<AccountCreationProperties>(defaultAccountInfo);
  const { authTokens } = useContext(AuthContext);

  const isDisabled = () => {
    return accountInfo.name === "";
  };

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    setAccountInfo({
      ...accountInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onSubmitCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post(API_CREATE_ACCOUNT_URL, accountInfo, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${authTokens?.access}`,
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),
      },
    });
    setAccountInfo(defaultAccountInfo);
    toggle();
    fetchAccountsData();
  };

  return (
    <Form onSubmit={onSubmitCreateAccount}>
      <FormGroup>
        <Label for="name">Account Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={onChange}
          value={accountInfo["name"]}
        />
      </FormGroup>
      <FormGroup>
        <Label for="account_type">Account Type:</Label>
        <Input
          type="select"
          name="account_type"
          value={accountInfo["account_type"]}
          onChange={onChange}
        >
          <option>{AccountType.checking}</option>
          <option>{AccountType.savings}</option>
        </Input>
      </FormGroup>
      <Button className={styles.button} type="submit" disabled={isDisabled()}>
        Submit
      </Button>
    </Form>
  );
};

export default CreateAccountForm;
