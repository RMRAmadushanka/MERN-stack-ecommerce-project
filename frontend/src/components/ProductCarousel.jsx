import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
console.log(products);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption
              style={{
                position: "absolute",
                width: "100%",
                left: "0",
                right: "0",
                bottom: "0",
                
              }}
            >
              <h2>
                {product.name} ${product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
