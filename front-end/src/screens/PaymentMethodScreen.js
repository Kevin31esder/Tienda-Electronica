import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { useNavigate } from "react-router-dom";

const PaymentMethodScreen = ({ history }) => {
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }
  const [paymentMethod, setPeymentMethod] = useState("paypal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Metodo de pago</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="pb-3">
          <Form.Label as="legend">Seleciona metodo</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label={`PayPal or Credit Card`}
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              defaultChecked
              onSelect={(e) => {
                setPeymentMethod(e.target.value);
              }}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Bit"
              id="Bit"
              name="paymentMethod"
              value="Bit"
              onSelect={(e) => {
                setPeymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="outline-primary">
          continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
