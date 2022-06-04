import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Message from "./Message";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const [signed, setSigned] = useState(false);
  const [addedShipped, setAddedShipped] = useState(false);

  return (
    <Nav justify className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Nav.Link
            onClick={() => {
              setSigned(!signed);
            }}
            className="neonStyled"
          >
            Iniciar sesión <i className="fa-regular fa-user"></i>{" "}
          </Nav.Link>
        ) : (
          <Nav.Link className="neonStyled" disabled>
            Iniciar sesión
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer
            to="/shipping"
            onSelect={() => {
              setAddedShipped(!addedShipped);
            }}
          >
            <Nav.Link className="neonStyled">
              Envio <i className="fas fa-home"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="neonStyled" disabled>
            Envio <i className="fas fa-home"></i>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="neonStyled">
              Pago <i className="fa-regular fa-credit-card"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="neonStyled" disabled>
            Pago <i className="fa-solid fa-credit-card"></i>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="neonStyled">
              Realizar pedido{" "}
              <i className="fa-solid fa-hand-holding-dollar"></i>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link className="neonStyled" disabled>
            Realizar pedido <i className="fa-solid fa-hand-holding-dollar"></i>
          </Nav.Link>
        )}
      </Nav.Item>
      {addedShipped && (
        <Message variant="success">
          Ya llenaste tu dirección de envío <i className="fas fa-check"></i>{" "}
        </Message>
      )}
      {signed && (
        <Message variant="success">
          ya iniciaste sesión<i className="fas fa-check"></i>{" "}
        </Message>
      )}
    </Nav>
  );
};

export default CheckoutSteps;
