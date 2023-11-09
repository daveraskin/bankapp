import React from "react";
import { Account } from "../AccountsTab";
import { makeAccountNumberPrivate } from "../../TransfersTab/TransferFundsForm";
import { ListGroup, ListGroupItem } from "reactstrap";
import styles from "./AccountsTable.module.css";
import { formatDollarValue } from "../../../utils/HelperFunctions";
import AccountListItem from "../AccountListItem";

const AccountsTableMobile = ({
  accountsData,
}: {
  accountsData: Account[] | null;
}) => {
  return (
    <React.Fragment>
      <ListGroup type="unstyled">
        {accountsData?.map((accountData) => {
          return (
            <ListGroupItem>
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
