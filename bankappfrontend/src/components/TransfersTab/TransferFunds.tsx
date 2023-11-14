import React from "react";
import { Account } from "../AccountsTab/AccountsTab";
import styles from "./TransferFunds.module.css";
import TransferFundsForm from "./TransferFundsForm";
import { Col, Row } from "reactstrap";
import { TabName } from "../../pages/Home";
import ErrorNotification from "../../utils/ErrorNotification/ErrorNotification";

const TransferFunds = ({
  accountsData,
  fetchAccountsData,
  setCurrentTab,
}: {
  accountsData: Account[] | null;
  fetchAccountsData: () => void;
  setCurrentTab: (newCurrentTab: TabName) => void;
}) => {
  return (
    <div className={styles.transferFundsContainer}>
      <Row>
        <h3 className={styles.transferFundsTitle}>Transfer Between Accounts</h3>
      </Row>
      <Row>
        <Col lg="4" xs="0"></Col>
        <Col lg="4" xs="12">
          <TransferFundsForm
            accountsData={accountsData}
            fetchAccountsData={fetchAccountsData}
            setCurrentTab={setCurrentTab}
          />
        </Col>
        <Col lg="4" xs="0"></Col>
      </Row>
    </div>
  );
};

export default TransferFunds;
