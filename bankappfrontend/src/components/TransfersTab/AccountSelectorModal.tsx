import React, { Fragment } from "react";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Account } from "../AccountsTab/AccountsTab";
import styles from "./TransferFunds.module.css";
import AccountListItem from "../AccountsTab/AccountListItem";

const AccountSelectorModal = ({
  accountsData,
  toggle,
  isOpen,
  setSelectedAccount,
  disabledAccount,
}: {
  accountsData: Account[] | null;
  toggle: () => void;
  isOpen: boolean;
  setSelectedAccount: (accountNumber: string) => void;
  disabledAccount: string | undefined;
}) => {
  const onClickAccountListItem = (accountNumber: string) => {
    setSelectedAccount(accountNumber);
    toggle();
  };
  return (
    <Fragment>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{"Select an Account"}</ModalHeader>
        <ModalBody>
          <ListGroup type="unstyled">
            {accountsData?.map((accountData) => {
              const isDisabled = accountData.account_number === disabledAccount;
              return (
                <ListGroupItem
                  onClick={() =>
                    isDisabled
                      ? null
                      : onClickAccountListItem(accountData.account_number)
                  }
                  key={accountData.account_number}
                  className={`${styles.accountListItem} ${
                    isDisabled && styles.disabledAccountListItem
                  }`}
                >
                  <AccountListItem
                    isDisabled={isDisabled}
                    accountData={accountData}
                  />
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AccountSelectorModal;
