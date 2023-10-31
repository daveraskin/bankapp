import React from "react";
import { AccountType } from "./CreateAccount/CreateAccountForm";
import styles from "./AccountsTab.module.css";
import AccountsTable from "./AccountsTable/AccountsTable";
import { Col, Row } from "reactstrap";
import CreateAccountModal from "./CreateAccount/CreateAccountModal";
import TransferFundsModal from "./TransferFunds/TransferFundsModal";

export interface Account {
  name: string;
  account_type: AccountType;
  balance: number;
  account_number: string;
}
const AccountsTab = ({
  fetchAccountsData,
  accountsData,
}: {
  fetchAccountsData: () => void;
  accountsData: Account[] | null;
}) => {
  const hasNoAccounts: boolean =
    accountsData === null || accountsData.length === 0;
  const isTransferFundsModalDisabled =
    hasNoAccounts || (accountsData !== null && accountsData?.length <= 1);

  return (
    <React.Fragment>
      {hasNoAccounts ? (
        <div className={styles.noAccountsPanel}>
          {" "}
          <h3>You have no active accounts with us. </h3>
          <h5>Click below to create one!</h5>
        </div>
      ) : (
        <AccountsTable
          accountsData={accountsData}
          fetchAccountsData={fetchAccountsData}
        />
      )}
      <Row>
        <Col>
          <CreateAccountModal fetchAccountsData={fetchAccountsData} />
        </Col>
        <Col>
          <TransferFundsModal
            disabled={isTransferFundsModalDisabled}
            accountsData={accountsData}
            fetchAccountsData={fetchAccountsData}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AccountsTab;
