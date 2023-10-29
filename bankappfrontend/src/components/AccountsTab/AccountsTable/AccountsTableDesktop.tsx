import React, { useState } from "react";
import { Account } from "../AccountsTab";
import { Table } from "reactstrap";
import { makeAccountNumberPrivate } from "../TransferFunds/TransferFundsForm";
import { formatDollarValue } from "../../../utils/HelperFunctions";
import styles from "./AccountsTable.module.css";
const AccountsTableDesktop = ({
  accountsData,
}: {
  accountsData: Account[] | null;
}) => {
  const [unhiddenAccount, setUnhiddenAccount] = useState<string | null>(null);
  const unhideAccount = (accountNumber: string) => {
    setUnhiddenAccount(accountNumber);
  };
  const hideAccount = () => {
    setUnhiddenAccount(null);
  };
  return (
    <Table className={styles.accountsTableDesktop}>
      <thead>
        <tr>
          <th>Account Number</th>
          <th>Account Name</th>
          <th>Account Type</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {accountsData?.map((accountData) => {
          const accountNumber = accountData.account_number;
          return (
            <tr key={accountNumber}>
              <td
                className={styles.accountNumber}
                onMouseEnter={(event) => unhideAccount(accountNumber)}
                onMouseLeave={hideAccount}
              >
                {unhiddenAccount === accountNumber
                  ? accountNumber
                  : makeAccountNumberPrivate(accountData.account_number)}
              </td>
              <td>{accountData.name}</td>
              <td>{accountData.account_type}</td>
              <td>{formatDollarValue(accountData.balance)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AccountsTableDesktop;
