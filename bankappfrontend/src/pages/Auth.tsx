import React from "react";
import LoginForm from "../components/AuthForms/LoginForm";
import { useLocation } from "react-router-dom";
import { AuthPageActions } from "../constants";
import SignUpForm from "../components/AuthForms/SignUpForm";

const Auth = () => {
  const location = useLocation();
  const { state } = location;

  const authForm =
    state?.action === AuthPageActions.SIGN_UP ? <SignUpForm /> : <LoginForm />;
  return (
    <div className="container">
      <div
        className="row"
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <div className="col-6">{authForm}</div>
      </div>
    </div>
  );
};

export default Auth;
