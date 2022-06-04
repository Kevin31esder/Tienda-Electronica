import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderAction";
const ProfileScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const dispatch = useDispatch();

  const costumerOrderList = useSelector((state) => state.costumerOrderList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = costumerOrderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const costumerOrders = useSelector((state) => state.userDetails);
  const { loading, error, user } = costumerOrders;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      if (!user.name || !user || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        if (loading === false) {
          setIsUpdated(true);
          setTimeout(() => {
            setIsUpdated(false);
          }, 4000);
        }
        setMessage(null);
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, success, loading]);
  const submitHandler = (e) => {
    setIsUpdated(false);
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage(`Passwords do not match`);
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Perfil</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error} </Message>}
        {isUpdated && (
          <Message variant="success">
            Perfil cambiado Existosamente <i className="fas fa-check"></i>{" "}
          </Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="name"
              required
              placeholder="Enter your full name"
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
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Form.Group controlId="Confirmar la contraseña">
            <Form.Label>Confirmar la contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirmar la  Contraseña"
              value={confirmPassword}
              onChange={(e) => setComfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Button type="submit" variant="outline-primary">
            Update <i className="fas fa-user-edit"></i>
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table
            size="sm"
            variant="outline-primary"
            striped
            bordered
            hover
            responsive
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>TOTAL</th>
                <th>PAGADO</th>
                <th>ENTEGRADO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <p>
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>{" "}
                        {order.paidAt.substring(0, 10)}
                      </p>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <p>
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>{" "}
                        {order.deliveredAt.substring(0, 10)}{" "}
                      </p>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="outline-primary">
                        Detalles
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
