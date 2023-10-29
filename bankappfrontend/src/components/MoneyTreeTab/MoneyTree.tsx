import React, {
  FormEvent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Account } from "../AccountsTab/AccountsTab";
import styles from "./MoneyTree.module.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {
  getBalance,
  makeAccountNumberPrivate,
} from "../AccountsTab/TransferFunds/TransferFundsForm";
import axios from "axios";
import DollarInput from "../../utils/DollarInput";
import AuthContext from "../../context/AuthContext";
import { API_MONEY_TREE_URL } from "../../constants";
import { formatDollarValue } from "../../utils/HelperFunctions";
import { useNavigate } from "react-router-dom";
import { TabName } from "../../pages/Home";

interface MoneyTreeFormData {
  account_number: string;
  amount: number;
}

const defaultFormData = {
  account_number: "",
  amount: 0,
};

const MoneyTree = ({
  accountsData,
  fetchAccountsData,
  setCurrentTab,
}: {
  accountsData: Account[] | null;
  fetchAccountsData: () => void;
  setCurrentTab: (newCurrentTab: TabName) => void;
}) => {
  const { postRequest } = useContext(AuthContext);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [formData, setFormData] = useState<MoneyTreeFormData>(defaultFormData);

  const onSubmitMoneyTreeForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postRequest(API_MONEY_TREE_URL, formData);
    if (response instanceof Error) {
      alert("uh oh baby");
    } else if (response.status === 200) {
      setFormData(defaultFormData);
      setSelectedAccount("");
      fetchAccountsData();
      setCurrentTab(TabName.ACCOUNTS);
    }
  };

  const onChangeAccountSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      account_number: event.target.value,
    });
    setSelectedAccount(event.target.value);
  };
  return (
    <div className={styles.moneyTreeContainer}>
      <h3 className={styles.moneyTreeTitle}>Money Does Grow On Trees!</h3>
      <Form onSubmit={onSubmitMoneyTreeForm}>
        <FormGroup>
          <Label>Select an account to add money to!</Label>
          <Input
            name="account_name"
            type="select"
            onChange={onChangeAccountSelection}
          >
            <option value={selectedAccount} selected disabled>
              Select an account
            </option>
            {accountsData?.map((account) => {
              return (
                <option
                  value={account.account_number}
                  key={account.account_number}
                >
                  {account.name} &nbsp; | &nbsp;
                  {makeAccountNumberPrivate(account.account_number)}
                </option>
              );
            })}
          </Input>
          {formData.account_number !== "" && (
            <Fragment>
              <div>Current Balance</div>
              <div>
                {formatDollarValue(
                  Number(getBalance(formData.account_number, accountsData))
                )}
              </div>
            </Fragment>
          )}
        </FormGroup>
        <FormGroup>
          <Label>How much money?</Label>
          &nbsp;&nbsp;
          <DollarInput
            setValue={setFormData}
            currentValue={formData}
            placeholder="e.g. 100.00"
            attributeName="amount"
          />
        </FormGroup>
        <Button disabled={selectedAccount === ""} type="submit">
          Money Me!
        </Button>
      </Form>
    </div>
  );
};

export default MoneyTree;
