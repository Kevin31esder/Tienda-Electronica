import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate.js";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productsActions";
import ProductCarousel from "../components/ProductCarousel";
import { Link, useParams } from "react-router-dom";

const HomeScreen = () => {
  let params = useParams();
  const pageNumber = params.pageNumber || 1;
  let keyword = params.keyword;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <h1
            className="hot"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            Mejores Productos{" "}
            <i style={{ color: "#E02401" }} className="fab fa-hotjar"></i>
          </h1>
          <ProductCarousel />
        </>
      ) : (
        <Link
          to="/"
          className="btn btn-outline-dark"
          style={{ marginTop: "20px" }}
        >
          <i className="far fa-hand-point-left"></i> Go Back{" "}
        </Link>
      )}
      <h1>Ultimos Productos</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error} <i className="fas fa-exclamation-triangle"></i>
        </Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col
                  className="body"
                  key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
