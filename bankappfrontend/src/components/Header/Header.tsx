import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { AuthPageActions } from "../../constants";

const Header = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = (
    <div>
      {" "}
      <span
        onClick={() =>
          navigate("/auth", { state: { action: AuthPageActions.LOG_IN } })
        }
      >
        Log In
      </span>{" "}
      or{" "}
      <span
        onClick={() =>
          navigate("/auth", { state: { action: AuthPageActions.SIGN_UP } })
        }
      >
        Sign Up
      </span>
    </div>
  );
  const logout = (
    <span style={{ float: "right" }} onClick={logoutUser}>
      Logout
    </span>
  );
  return (
    <div className={styles.header}>
      <h2 className={styles.appTitle}>BankApp</h2>
      {user ? logout : login}
    </div>
  );
};
export default Header;
