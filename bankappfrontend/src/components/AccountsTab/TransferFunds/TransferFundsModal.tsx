import React, { useState, Fragment } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import TransferFundsForm from "./TransferFundsForm";
import { Account } from "../AccountsTab";
import styles from "../AccountsTab.module.css";

const TransferFundsModal = ({
  accountsData,
  fetchAccountsData,
  disabled,
}: {
  accountsData: Account[] | null;
  fetchAccountsData: () => void;
  disabled: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Fragment>
      <Button disabled={disabled} className={styles.button} onClick={toggle}>
        Transfer Between Accounts
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{"Transfer Funds"}</ModalHeader>
        <ModalBody>
          <TransferFundsForm
            fetchAccountsData={fetchAccountsData}
            accountsData={accountsData}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default TransferFundsModal;
