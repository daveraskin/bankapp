import React, { Fragment, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import styles from "./AuthForms.module.css";
import AuthContext from "../../context/AuthContext";
import ErrorNotification from "../../utils/ErrorNotification/ErrorNotification";
import { AuthPageActions } from "../../constants";

const LoginForm = () => {
  const { loginUser, authError } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Fragment>
      <Form onSubmit={loginUser}>
        {authError && <ErrorNotification errorMessage={authError} />}
        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            id="username"
            name="username"
            placeholder="user@name.com"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      <div className={styles.createAccountPrompt}>
        <div>Don't have an account yet?</div>
        <div
          onClick={() => {
            navigate("/auth", { state: { action: AuthPageActions.SIGN_UP } });
          }}
          className={styles.createAccountPromptLink}
        >
          Click here to create one!
        </div>
      </div>
    </Fragment>
  );
};

export default LoginForm;
