import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

function LoginScreen() {
  let location = useLocation();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(redirect);
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userLogin, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Ingresar</h1>
      {error && (
        <Message variant="danger">
          {error} <i className="fas fa-exclamation-triangle"></i>
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" variant="outline-primary">
          Ingresar <i className="fas fa-sign-in-alt"></i>
        </Button>
      </Form>
      <Row className="py-3">
        <Col>Nuevo Usuario?</Col>{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Registrarse
        </Link>
      </Row>
    </FormContainer>
  );
}
export default LoginScreen;
