import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, TabContent, TabPane } from "reactstrap";

import axios from "axios";
import { API_GET_USER_ACCOUNTS_URL, API_GET_USER_URL } from "../constants";
import UserInfo from "../components/UserInfo";
import AuthContext, { parseErrorMessage } from "../context/AuthContext";
import AccountsTab, { Account } from "../components/AccountsTab/AccountsTab";
import NavigationTabs from "../components/NavigationTabs/NavigationTabs";
import MoneyTree from "../components/MoneyTreeTab/MoneyTree";

export enum TabName {
  ACCOUNTS = "ACCOUNTS",
  MONEY_TREE = "MONEY_TREE",
  CREDIT_SCORE = "CREDIT_SCORE",
}

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  pk: number | undefined;
}

const Home = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | null>(null);
  const [accountsData, setAccountsData] = useState<Account[] | null>(null);
  const [currentTab, setCurrentTab] = useState<TabName>(TabName.ACCOUNTS);

  useEffect(() => {
    fetchUserInfo();
    fetchAccountsData();
  }, [authTokens]);

  const fetchAccountsData = async () => {
    try {
      const response = await axios.get(API_GET_USER_ACCOUNTS_URL, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      const data = response.data.accounts;
      const accounts = data.map((accountData: Account) => {
        return {
          name: accountData.name,
          account_type: accountData.account_type,
          balance: accountData.balance,
          account_number: accountData.account_number,
        };
      });
      setAccountsData(accounts);
    } catch (error) {
      console.log(parseErrorMessage(error));
    }
  };
  useEffect(() => {
    fetchAccountsData();
  }, [authTokens]);
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(API_GET_USER_URL, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });

      setUserData(response.data.user);
    } catch (error) {
      logoutUser();
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <UserInfo userData={userData} />
          <NavigationTabs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <TabContent activeTab={currentTab}>
            <TabPane tabId={TabName.ACCOUNTS}>
              <AccountsTab
                fetchAccountsData={fetchAccountsData}
                accountsData={accountsData}
              />
            </TabPane>
            <TabPane tabId={TabName.MONEY_TREE}>
              <MoneyTree
                fetchAccountsData={fetchAccountsData}
                setCurrentTab={setCurrentTab}
                accountsData={accountsData}
              />
            </TabPane>
            <TabPane tabId={TabName.CREDIT_SCORE}>Credit Score!</TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
