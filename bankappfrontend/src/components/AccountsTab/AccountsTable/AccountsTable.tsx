import React, { useEffect, useState } from "react";
import { Account } from "../AccountsTab";
import AccountsTableDesktop from "./AccountsTableDesktop";
import AccountsTableMobile from "./AccountsTableMobile";

const AccountsTable = ({
  accountsData,
  fetchAccountsData,
}: {
  accountsData: Account[] | null;
  fetchAccountsData: () => void;
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return isMobile ? (
    <AccountsTableMobile accountsData={accountsData} />
  ) : (
    <AccountsTableDesktop accountsData={accountsData} />
  );
};

export default AccountsTable;
