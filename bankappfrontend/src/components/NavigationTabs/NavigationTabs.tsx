import React, { useEffect, useState } from "react";
import { TabName } from "../../pages/Home";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarToggler,
  Row,
} from "reactstrap";
import styles from "./NavigationTabs.module.css";

const NavigationTabs = ({
  setCurrentTab,
  currentTab,
}: {
  setCurrentTab: (newCurrentTab: TabName) => void;
  currentTab: TabName;
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

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

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const inactiveTabStyle = `${styles.tab} ${isMobile && styles.mobileTab}`;
  const activeTabStyle = `${styles.tab} ${styles.active} ${
    isMobile && styles.mobileTab
  }`;
  return (
    <Navbar className={styles.navBar}>
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <NavbarToggler
          hidden={!isMobile || !isCollapsed}
          onClick={toggleNavbar}
          className={styles.navbarToggler}
        />
      </div>

      <Collapse
        className={styles.collapse}
        isOpen={!isMobile ? true : !isCollapsed}
      >
        <Nav
          vertical={isMobile}
          className={`${styles.navTabs} ${isMobile && styles.mobileNavTabs}`}
          tabs
        >
          <NavItem
            className={
              currentTab === TabName.ACCOUNTS_SUMMARY
                ? activeTabStyle
                : inactiveTabStyle
            }
          >
            <NavLink
              className={`${styles.navLink} ${
                isMobile && styles.mobileNavLink
              }`}
              onClick={() => {
                setCurrentTab(TabName.ACCOUNTS_SUMMARY);
                toggleNavbar();
              }}
            >
              Accounts Summary
            </NavLink>
          </NavItem>
          <NavItem
            className={
              currentTab === TabName.TRANSFERS
                ? activeTabStyle
                : inactiveTabStyle
            }
          >
            <NavLink
              className={`${styles.navLink} ${
                isMobile && styles.mobileNavLink
              }`}
              onClick={() => {
                setCurrentTab(TabName.TRANSFERS);
                toggleNavbar();
              }}
            >
              Transfers
            </NavLink>
          </NavItem>
          <NavItem
            className={
              currentTab === TabName.MONEY_TREE
                ? activeTabStyle
                : inactiveTabStyle
            }
          >
            <NavLink
              className={`${styles.navLink} ${
                isMobile && styles.mobileNavLink
              }`}
              onClick={() => {
                setCurrentTab(TabName.MONEY_TREE);
                toggleNavbar();
              }}
            >
              Money Tree
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavigationTabs;
