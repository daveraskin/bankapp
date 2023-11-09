import React, { Fragment, useState } from "react";
import { Account } from "../AccountsTab/AccountsTab";
import styles from "./TransferFunds.module.css";
import AccountListItem from "../AccountsTab/AccountListItem";
import { AccountType } from "../AccountsTab/CreateAccount/CreateAccountForm";
import AccountSelectorModal from "./AccountSelectorModal";

const AccountSelector = ({
  accountsData,
  setSelectedAccount,
  selectedAccount,
  disabledAccount,
}: {
  accountsData: Account[] | null;
  setSelectedAccount: (selectedAccountNumber: string) => void;
  selectedAccount: string;
  disabledAccount?: string | undefined;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onClickSelectAccount = () => {
    toggle();
  };
  const noSelectionListItem = (
    <div onClick={onClickSelectAccount} className={styles.noSelectionDiv}>
      <div>Select Account</div>
      <i className="fa-solid fa-angle-right"></i>
    </div>
  );
  return (
    <Fragment>
      {selectedAccount === "" ? (
        noSelectionListItem
      ) : (
        <div className={styles.selectionDiv}>
          <AccountListItem
            onClick={onClickSelectAccount}
            accountData={
              accountsData?.find(
                (accountData) => accountData.account_number === selectedAccount
              ) ?? {
                account_number: "",
                account_type: AccountType.checking,
                name: "fake",
                balance: 2,
              }
            }
          />
        </div>
      )}
      <AccountSelectorModal
        accountsData={accountsData}
        isOpen={isModalOpen}
        toggle={toggle}
        disabledAccount={disabledAccount}
        setSelectedAccount={setSelectedAccount}
      />
    </Fragment>
  );
};

export default AccountSelector;
