import React from "react";
import { Account } from "../AccountsTab";
import { makeAccountNumberPrivate } from "../TransferFunds/TransferFundsForm";
import { ListGroup, ListGroupItem } from "reactstrap";
import styles from "./AccountsTable.module.css";
import { formatDollarValue } from "../../../utils/HelperFunctions";

const AccountsTableMobile = ({
  accountsData,
}: {
  accountsData: Account[] | null;
}) => {
  const MobileListComponent = ({ accountData }: { accountData: Account }) => {
    return (
      <div className={styles.mobileListComponent}>
        <div>
          {makeAccountNumberPrivate(accountData.account_number, true)} *{" "}
          {accountData.name}
        </div>
        <div className={styles.balance}>
          <div className={styles.balanceTitle}>Balance</div>
          <div className={styles.balanceFigure}>
            {formatDollarValue(accountData.balance)}
          </div>
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      <ListGroup type="unstyled">
        {accountsData?.map((accountData) => {
          return (
            <ListGroupItem>
              <MobileListComponent
                key={accountData.account_number}
                accountData={accountData}
              />
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </React.Fragment>
  );
};

export default AccountsTableMobile;
