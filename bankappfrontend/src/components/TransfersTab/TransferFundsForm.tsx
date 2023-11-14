import React, {
  FormEvent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert, Button, Form, FormGroup, Label } from "reactstrap";
import { API_TRANSFER_FUNDS_URL } from "../../constants";
import styles from "./TransferFunds.module.css";
import AuthContext from "../../context/AuthContext";
import { Account } from "../AccountsTab/AccountsTab";
import DollarInput from "../../utils/DollarInput";
import AccountSelector from "./AccountSelector";
import { TabName } from "../../pages/Home";

interface TransferFormInfo {
  // transferFrom and transferTo will either be a string representing
  // a stringified version of one of this bank's
  // 12-digit account numbers.
  transferFrom: string;
  transferTo: string;
  //  the amount to transfer in USD
  amount: number;
}

export const makeAccountNumberPrivate = (
  accountNumberString: string,
  // a boolean value that, if true, will cause the function to
  // return only the last four digits without the stars
  isMobile: boolean = false
) => {
  const SCRAMBLED_DIGITS = "********";
  const lastFour = accountNumberString.slice(8, 12);
  return isMobile ? lastFour : SCRAMBLED_DIGITS + lastFour;
};

export const getBalance = (
  accountNumber: string,
  accountsData: Account[] | null
) => {
  if (accountsData === null) return null;

  const account = accountsData.find(
    (account) => account.account_number === accountNumber
  );
  const balance = account?.balance;

  return balance ? Number(balance).toFixed(2) : null;
};

const TransferFundsForm = ({
  accountsData,
  fetchAccountsData,
  setCurrentTab,
}: {
  accountsData: Account[] | null;
  fetchAccountsData: () => void;
  setCurrentTab: (newCurrentTab: TabName) => void;
}) => {
  const { postRequest } = useContext(AuthContext);
  const [transferFrom, setTransferFrom] = useState<string>("");
  const [transferTo, setTransferTo] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<number>(0);

  const hasTooFewAccounts = accountsData === null || accountsData.length < 2;

  const [isTransferFormDisabled, setIsTransferFormDisabled] =
    useState<boolean>(true);
  const [shouldDisplayOverdrawnMessage, setShouldDisplayOverdrawnMessage] =
    useState<boolean>(false);

  useEffect(() => {
    const isOverdrawn =
      transferAmount <= Number(getBalance(transferFrom, accountsData))
        ? false
        : true;
    if (
      transferFrom !== "" &&
      transferTo !== "" &&
      !isOverdrawn &&
      transferAmount > 0
    ) {
      setIsTransferFormDisabled(false);
    } else {
      setIsTransferFormDisabled(true);
    }

    if (isOverdrawn) {
      setShouldDisplayOverdrawnMessage(true);
    } else {
      setShouldDisplayOverdrawnMessage(false);
    }
  }, [transferAmount, transferTo, transferFrom]);

  const onSubmitTransferForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postRequest(API_TRANSFER_FUNDS_URL, {
      transferFrom: transferFrom,
      transferTo: transferTo,
      amount: transferAmount,
    });
    if (response instanceof Error) {
      console.log(response.message);
    } else if (response.status === 200) {
      fetchAccountsData();
      setTransferFrom("");
      setTransferTo("");
      setTransferAmount(0);
      setCurrentTab(TabName.ACCOUNTS_SUMMARY);
    }
  };

  return (
    <Fragment>
      <Alert
        color="secondary"
        className={styles.tooFewAccountsMessage}
        hidden={!hasTooFewAccounts}
      >
        You cannot make transfers with fewer than two active accounts. Create
        new accounts on the{" "}
        <span
          className={styles.accountsSummaryLink}
          onClick={() => setCurrentTab(TabName.ACCOUNTS_SUMMARY)}
        >
          Accounts Summary
        </span>{" "}
        page and add funds to those accounts at the{" "}
        <span
          className={styles.accountsSummaryLink}
          onClick={() => setCurrentTab(TabName.MONEY_TREE)}
        >
          Money Tree
        </span>
        .
      </Alert>
      <Form onSubmit={onSubmitTransferForm}>
        <FormGroup className={styles.leftAlignFormGroup}>
          <Label className={styles.transferFundsFormLabel}>From Account</Label>
          <AccountSelector
            accountsData={accountsData}
            isDisabled={hasTooFewAccounts}
            selectedAccount={transferFrom}
            setSelectedAccount={(selectedAccount: string) =>
              setTransferFrom(selectedAccount)
            }
            disabledAccount={transferTo !== "" ? transferTo : undefined}
          />
        </FormGroup>
        <FormGroup className={styles.leftAlignFormGroup}>
          <Label className={styles.transferFundsFormLabel}>To Account</Label>
          <AccountSelector
            accountsData={accountsData}
            isDisabled={hasTooFewAccounts}
            selectedAccount={transferTo}
            setSelectedAccount={(selectedAccount: string) =>
              setTransferTo(selectedAccount)
            }
            disabledAccount={transferFrom !== "" ? transferFrom : undefined}
          />
        </FormGroup>
        <FormGroup className={styles.leftAlignFormGroup}>
          <Label className={styles.transferFundsFormLabel}>
            Transfer Amount
          </Label>
          <DollarInput
            isDisabled={hasTooFewAccounts}
            currentValue={transferAmount}
            setCurrentValue={setTransferAmount}
            placeholder="$100.00"
          />
          {shouldDisplayOverdrawnMessage && (
            <span>
              You can't transfer an amount greater than the account balance
            </span>
          )}
        </FormGroup>
        <Button disabled={isTransferFormDisabled} className={styles.button}>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

export default TransferFundsForm;
