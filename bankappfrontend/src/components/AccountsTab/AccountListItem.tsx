import React from "react";
import { Account } from "./AccountsTab";
import { formatDollarValue } from "../../utils/HelperFunctions";
import { makeAccountNumberPrivate } from "../TransfersTab/TransferFundsForm";
import styles from "./AccountsTab.module.css";
import { AccountType } from "./CreateAccount/CreateAccountForm";

const formatAccountTypeBadgeText = (accountData: Account): string => {
  return accountData.account_type === AccountType.checking ? "Ch" : "Sa";
};

const AccountListItem = ({
  accountData,
  isDisabled,
  onClick,
}: {
  accountData: Account;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}) => {
  return (
    <div onClick={onClick} className={styles.mobileListComponent}>
      <div className={styles.accountTypeBadge}>
        {formatAccountTypeBadgeText(accountData)}
      </div>
      <div
        className={`${styles.mobileListComponentText} ${
          isDisabled && styles.disabled
        }`}
      >
        <div className={styles.accountNameText}>
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
    </div>
  );
};

export default AccountListItem;
