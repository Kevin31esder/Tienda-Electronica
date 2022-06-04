import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderAction";
import { useNavigate } from "react-router-dom";

const OrdersListScreen = () => {
  let navigate = useNavigate;

  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <h1>Detalles Ordenes</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error} <i class="fas fa-exclamation-triangle"></i>
        </Message>
      ) : (
        <Table variant="secondary" striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Pagado?</th>
              <th>Entregado?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <p>
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>{" "}
                      {order.paidAt.substring(0, 10)}{" "}
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
                    <Button variant="outline-primary" className="btn-sm">
                      Detalles
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersListScreen;
