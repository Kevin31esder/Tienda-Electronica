import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SearchBox = ({ history }) => {
  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="webdesigntuts-workshop">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyWord(e.target.value)}
        placeholder="Que Buscas?"
        className="search mr-sm-2 ml-sm-5"
      ></Form.Control>
      <button type="submit">
        Buscar <i className="fas fa-search"></i>
      </button>
    </Form>
  );
};

export default SearchBox;
