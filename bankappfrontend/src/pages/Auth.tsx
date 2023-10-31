import React from "react";
import LoginForm from "../components/AuthForms/LoginForm";
import { useLocation } from "react-router-dom";
import { AuthPageActions } from "../constants";
import SignUpForm from "../components/AuthForms/SignUpForm";
import { Col, Container, Row } from "reactstrap";

const Auth = () => {
  const location = useLocation();
  const { state } = location;

  const authForm =
    state?.action === AuthPageActions.SIGN_UP ? <SignUpForm /> : <LoginForm />;
  return (
    <Container>
      <Row
        className="row"
        style={{
          paddingTop: "20px",
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Col xs="12" sm="12" md="8" lg="6">
          {authForm}
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
