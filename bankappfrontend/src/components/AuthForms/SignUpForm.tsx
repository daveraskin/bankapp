import React, { useContext, useEffect, useState } from "react";
import { FormGroup, Label, Input, Form, Button } from "reactstrap";
import styles from "./AuthForms.module.css";
import AuthContext from "../../context/AuthContext";

export interface SignUpFormData {
  username: string;
  pass1: string;
  pass2: string;
  email: string;
  firstName: string;
  lastName: string;
}

const validateEmail = (email: string) => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateName = (name: string) => {
  if (name.length < 2 || name.length > 255) return false;
  return /^[A-Za-z\-']+$/u.test(name);
};

const validateUsername = (username: string) => {
  return username.length > 3 && username.length < 255;
};

const validatePassword = (pass1: string, pass2?: string) => {
  const isLengthValid = pass1.length > 7 && pass1.length < 255;
  const arePasswordsMatching = pass2 ? pass1 === pass2 : true;

  return isLengthValid && arePasswordsMatching;
};

const SignUpForm = () => {
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    username: "",
    pass1: "",
    pass2: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [isFormDataValid, setIsFormDataValid] = useState<boolean>(false);
  const { createUser } = useContext(AuthContext);
  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUser(signUpFormData);
  };

  const validateFormData = () => {
    const data = signUpFormData;
    const isUsernameValid = validateUsername(data.username);
    const isPasswordValid = validatePassword(data.pass1, data.pass2);
    const isEmailValid = validateEmail(data.email);
    const isFirstNameValid = validateName(data.firstName);
    const isLastNameValid = validateName(data.lastName);

    setIsFormDataValid(
      isUsernameValid &&
        isPasswordValid &&
        isEmailValid &&
        isFirstNameValid &&
        isLastNameValid
    );
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    validateFormData();
  }, [signUpFormData]);

  return (
    <React.Fragment>
      <h2 className={styles.createAccountHeader}>Create an Account</h2>
      <Form onSubmit={onSubmitSignUp}>
        <div className={styles.leftAlignedForm}>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.inputLabel} for="username">
              Username:
            </Label>
            <Input
              value={signUpFormData.username}
              onChange={onChange}
              id="username"
              name="username"
              type="text"
            ></Input>
            {signUpFormData.username !== "" &&
              !validateUsername(signUpFormData.username) && (
                <p className={styles.validationError}>
                  Invalid username. Must be between 4 and 255 characters.
                </p>
              )}
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.inputLabel} for="pass1">
              Password:
            </Label>
            <Input
              value={signUpFormData.pass1}
              onChange={onChange}
              id="pass1"
              name="pass1"
              type="text"
            ></Input>
            {signUpFormData.pass1 !== "" &&
              !validatePassword(signUpFormData.pass1) && (
                <p className={styles.validationError}>
                  Password must be at least 8 characters.
                </p>
              )}
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.inputLabel} for="pass2">
              Re-enter Password:
            </Label>
            <Input
              value={signUpFormData.pass2}
              onChange={onChange}
              id="pass2"
              name="pass2"
              type="text"
            ></Input>
            {signUpFormData.pass2 !== "" &&
              validatePassword(signUpFormData.pass1) &&
              !validatePassword(signUpFormData.pass1, signUpFormData.pass2) && (
                <p className={styles.validationError}>Passwords must match.</p>
              )}
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.inputLabel} for="email">
              E-mail:
            </Label>
            <Input
              value={signUpFormData.email}
              onChange={onChange}
              id="email"
              name="email"
              type="email"
            ></Input>
            {signUpFormData.email !== "" &&
              !validateEmail(signUpFormData.email) && (
                <p className={styles.validationError}>
                  Please enter a valid E-mail.
                </p>
              )}
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.inputLabel} for="firstName">
              First Name:
            </Label>
            <Input
              value={signUpFormData.firstName}
              onChange={onChange}
              id="firstName"
              name="firstName"
              type="text"
            ></Input>
            {signUpFormData.firstName !== "" &&
              !validateName(signUpFormData.firstName) && (
                <p className={styles.validationError}>
                  Names must be at least two characters. Only alphabetical
                  characters are allowed.
                </p>
              )}
          </FormGroup>
          <FormGroup className={styles.formGroup}>
            <Label className={styles.inputLabel} for="lastName">
              Last Name:
            </Label>
            <Input
              value={signUpFormData.lastName}
              onChange={onChange}
              id="lastName"
              name="lastName"
              type="text"
            ></Input>
            {signUpFormData.lastName !== "" &&
              !validateName(signUpFormData.lastName) && (
                <p className={styles.validationError}>
                  Names must be at least two characters. Only alphabetical
                  characters are allowed.
                </p>
              )}
          </FormGroup>
        </div>
        <Button type="submit" disabled={!isFormDataValid}>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
};

export default SignUpForm;
