import React, { useState } from "react";
import { Account } from "../AccountsTab";

const AccountSelector = ({
  accountsData,
}: {
  accountsData: Account[] | null;
}) => {
  const selectedAccount = useState<string>("");
  const noSelectionListItem = <div>Select an Account</div>;
  return <div></div>;
};

export default AccountSelector;
