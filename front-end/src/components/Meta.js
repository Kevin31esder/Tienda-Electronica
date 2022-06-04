import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "NeonTech - La mejor tienda de calidad ",
  description:
    "¡Computadoras, Electrónica, Gadgets y muchos productos tecnológicos! ",
  keywords: "Informática , Electrónica , Gadgets y Productos Móviles",
};

export default Meta;
