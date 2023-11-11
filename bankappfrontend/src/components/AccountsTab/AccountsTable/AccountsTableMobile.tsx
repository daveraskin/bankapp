import React from "react";
import { Account } from "../AccountsTab";
import { ListGroup, ListGroupItem } from "reactstrap";
import styles from "./AccountsTable.module.css";
import AccountListItem from "../AccountListItem";

const AccountsTableMobile = ({
  accountsData,
}: {
  accountsData: Account[] | null;
}) => {
  return (
    <React.Fragment>
      <ListGroup type="unstyled" className={styles.accountsTableMobile}>
        {accountsData?.map((accountData) => {
          return (
            <ListGroupItem className={styles.accountListGroupItem}>
              <AccountListItem
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
