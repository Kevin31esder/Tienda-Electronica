import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  let location = useLocation();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      redirect("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
      redirect("/");
    }
  };
  return (
    <FormContainer>
      <h1>Registrarse</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && (
        <Message variant="danger">
          {error} <i className="fas fa-exclamation-triangle"></i>
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control
            type="name"
            required
            placeholder="Nombre Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="email">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Ingresa tu email"
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
            placeholder="Ingresa una contrase??a"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmar Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Confirma tu Contrase??a"
            value={confirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type="submit" variant="outline-primary">
          Registrarse <i className="fas fa-user-plus"></i>
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Tienes una cuenta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Ingresar
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
