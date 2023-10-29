import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { User } from "../../../pages/Home";
import CreateAccountForm from "./CreateAccountForm";
import styles from "../AccountsTab.module.css";

const CreateAccountModal = ({
  user,
  fetchAccountsData,
}: {
  user?: User | null;
  fetchAccountsData: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Fragment>
      <Button className={styles.button} onClick={toggle}>
        Create New Account
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{"Create New Account"}</ModalHeader>
        <ModalBody>
          <CreateAccountForm
            fetchAccountsData={fetchAccountsData}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CreateAccountModal;
