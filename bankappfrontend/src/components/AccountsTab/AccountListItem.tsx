import React from "react";
import { Account } from "./AccountsTab";
import { formatDollarValue } from "../../utils/HelperFunctions";
import { makeAccountNumberPrivate } from "./TransferFunds/TransferFundsForm";
import styles from "./AccountsTab.module.css";

const AccountListItem = ({ accountData }: { accountData: Account }) => {
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

export default AccountListItem;
