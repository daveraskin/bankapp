import React, { FormEvent, useContext } from "react";

import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import AuthContext from "../../context/AuthContext";
import ErrorNotification from "../../utils/ErrorNotification/ErrorNotification";

const LoginForm = () => {
  const { loginUser, authError } = useContext(AuthContext);

  return (
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
  );
};

export default LoginForm;
