import React, { Fragment, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FormGroup, Label, Input, Form, Button, Spinner } from "reactstrap";
import styles from "./AuthForms.module.css";
import AuthContext from "../../context/AuthContext";
import ErrorNotification from "../../utils/ErrorNotification/ErrorNotification";
import { AuthPageActions } from "../../constants";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginUser, authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmitLoginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await loginUser(event);
    setIsLoading(false);
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmitLoginUser}>
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
        <Button type="submit" className={styles.spinnerButton}>
          {isLoading ? <Spinner size="sm" /> : "Submit"}
        </Button>
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
