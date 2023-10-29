import React from "react";
import { TabName } from "../../pages/Home";
import { Nav, NavItem, NavLink } from "reactstrap";
import styles from "./NavigationTabs.module.css";

const NavigationTabs = ({
  setCurrentTab,
  currentTab,
}: {
  setCurrentTab: (newCurrentTab: TabName) => void;
  currentTab: TabName;
}) => {
  const activeTabStyle = `${styles.tab} ${styles.active}`;
  return (
    <Nav className={styles.navTabs} tabs>
      <NavItem
        className={
          currentTab === TabName.ACCOUNTS ? activeTabStyle : styles.tab
        }
      >
        <NavLink
          className={styles.navLink}
          onClick={() => setCurrentTab(TabName.ACCOUNTS)}
        >
          Accounts
        </NavLink>
      </NavItem>
      <NavItem
        className={
          currentTab === TabName.MONEY_TREE ? activeTabStyle : styles.tab
        }
      >
        <NavLink
          className={styles.navLink}
          onClick={() => setCurrentTab(TabName.MONEY_TREE)}
        >
          Money Tree
        </NavLink>
      </NavItem>
      {/* <NavItem
        className={
          currentTab === TabName.CREDIT_SCORE ? activeTabStyle : styles.tab
        }
      >
        <NavLink
          className={styles.navLink}
          onClick={() => setCurrentTab(TabName.CREDIT_SCORE)}
        >
          Credit Score
        </NavLink>
      </NavItem> */}
    </Nav>
  );
};

export default NavigationTabs;
