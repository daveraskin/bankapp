import React, { FormEvent, useContext, useState } from "react";
import { Account } from "../AccountsTab/AccountsTab";
import styles from "./MoneyTree.module.css";
import { Button, Col, Form, FormGroup, Label, Row } from "reactstrap";
import DollarInput from "../../utils/DollarInput";
import AuthContext from "../../context/AuthContext";
import { API_MONEY_TREE_URL } from "../../constants";
import { TabName } from "../../pages/Home";
import AccountSelector from "../TransfersTab/AccountSelector";

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
  const [amount, setAmount] = useState(0);

  const onSubmitMoneyTreeForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postRequest(API_MONEY_TREE_URL, {
      account_number: selectedAccount,
      amount: amount,
    });
    if (response instanceof Error) {
      alert("uh oh baby");
    } else if (response.status === 200) {
      setAmount(0);
      setSelectedAccount("");
      fetchAccountsData();
      setCurrentTab(TabName.ACCOUNTS_SUMMARY);
    }
  };

  return (
    <div className={styles.moneyTreeContainer}>
      <h3 className={styles.moneyTreeTitle}>The Money Tree</h3>
      <Row>
        <Col lg="4" xs="0"></Col>
        <Col lg="4" xs="12">
          <Form onSubmit={onSubmitMoneyTreeForm}>
            <FormGroup className={styles.leftAlignFormGroup}>
              <Label className={styles.moneyTreeFormLabel}>To Account</Label>
              <AccountSelector
                accountsData={accountsData}
                setSelectedAccount={setSelectedAccount}
                selectedAccount={selectedAccount}
              />
            </FormGroup>
            <FormGroup className={styles.leftAlignFormGroup}>
              <Label className={styles.moneyTreeFormLabel}>Amount</Label>
              <DollarInput setCurrentValue={setAmount} currentValue={amount} />
            </FormGroup>
            <Button disabled={selectedAccount === ""} type="submit">
              Money Me!
            </Button>
          </Form>
        </Col>
        <Col lg="4" xs="0"></Col>
      </Row>
    </div>
  );
};

export default MoneyTree;
