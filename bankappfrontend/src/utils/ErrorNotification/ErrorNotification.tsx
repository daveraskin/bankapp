import React from "react";
import styles from "./ErrorNotification.module.css";
import { Alert } from "reactstrap";
import { errors } from "../../constants/errors";

const ErrorNotification = ({ errorMessage }: { errorMessage: string }) => {
  const errorDisplayMessage = errors[errorMessage]
    ? errors[errorMessage]
    : errorMessage;
  return <Alert color="danger">{errorDisplayMessage}</Alert>;
};

export default ErrorNotification;
