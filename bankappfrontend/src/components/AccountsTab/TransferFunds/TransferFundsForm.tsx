import React, {
  FormEvent,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { API_TRANSFER_FUNDS_URL } from "../../../constants";
import styles from "../AccountsTab.module.css";
import AuthContext from "../../../context/AuthContext";
import { Account } from "../AccountsTab";
import DollarInput from "../../../utils/DollarInput";
import { formatDollarValue } from "../../../utils/HelperFunctions";
import AccountSelector from "./AccountSelector";

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
  toggle,
  fetchAccountsData,
}: {
  accountsData: Account[] | null;
  toggle: () => void;
  fetchAccountsData: () => void;
}) => {
  const { authTokens, postRequest } = useContext(AuthContext);
  const [transferFormInfo, setTransferFormInfo] = useState<TransferFormInfo>({
    transferFrom: "",
    transferTo: "",
    amount: 0,
  });
  const [selectedFromAccount, setSelectedFromAccount] = useState<string>("");
  const [selectedToAccount, setSelectedToAccount] = useState<string>("");
  const [isTransferFormDisabled, setIsTransferFormDisabled] =
    useState<boolean>(true);
  const [shouldDisplayOverdrawnMessage, setShouldDisplayOverdrawnMessage] =
    useState<boolean>(false);

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.name === "transferTo") {
      setSelectedToAccount(event.currentTarget.value);
    } else if (event.currentTarget.name === "transferFrom") {
      setSelectedFromAccount(event.currentTarget.value);
    }
    setTransferFormInfo({
      ...transferFormInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    const isOverdrawn =
      transferFormInfo.amount <=
      Number(getBalance(transferFormInfo.transferFrom, accountsData))
        ? false
        : true;
    if (
      selectedFromAccount !== "" &&
      selectedToAccount !== "" &&
      !isOverdrawn &&
      transferFormInfo.amount > 0
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
  }, [transferFormInfo]);

  const onSubmitTransferForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postRequest(
      API_TRANSFER_FUNDS_URL,
      transferFormInfo
    );
    if (response instanceof Error) {
      console.log(response.message);
    } else if (response.status === 200) {
      setTransferFormInfo({
        transferFrom: "",
        transferTo: "",
        amount: 0,
      });
      fetchAccountsData();
      toggle();
    }
  };

  return (
    <Form onSubmit={onSubmitTransferForm}>
      <FormGroup>
        <Label>Transfer To</Label>
        <AccountSelector accountsData={accountsData} />
      </FormGroup>
      <FormGroup>
        <Label>Transfer To</Label>
        <Input
          type="select"
          value={transferFormInfo["transferTo"]}
          name="transferTo"
          onChange={onChange}
        >
          <option value="" selected>
            -----Select an account-----
          </option>
          {accountsData?.map((userAccount) => {
            return (
              <option
                disabled={selectedFromAccount === userAccount.account_number}
                value={userAccount.account_number}
                key={userAccount.account_number}
              >
                {userAccount.name} &nbsp; | &nbsp;
                {makeAccountNumberPrivate(userAccount.account_number)}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>Transfer From</Label>
        <Input
          type="select"
          value={transferFormInfo["transferFrom"]}
          name="transferFrom"
          onChange={onChange}
        >
          <option value="" selected>
            -----Select an account-----
          </option>
          {accountsData?.map((userAccount) => {
            return (
              <option
                disabled={selectedToAccount === userAccount.account_number}
                value={userAccount.account_number}
                key={userAccount.account_number}
              >
                {userAccount.name} &nbsp; | &nbsp;
                {makeAccountNumberPrivate(userAccount.account_number)}
              </option>
            );
          })}
        </Input>
        {transferFormInfo.transferFrom !== "" && (
          <Fragment>
            <div>
              Current Balance:&nbsp;
              {formatDollarValue(
                Number(getBalance(transferFormInfo.transferFrom, accountsData))
              )}
            </div>
            <div></div>
          </Fragment>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Transfer Amount</Label>
        &nbsp;&nbsp;
        <DollarInput
          attributeName="amount"
          setValue={setTransferFormInfo}
          currentValue={transferFormInfo}
          placeholder="e.g. 10.50"
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
  );
};

export default TransferFundsForm;
