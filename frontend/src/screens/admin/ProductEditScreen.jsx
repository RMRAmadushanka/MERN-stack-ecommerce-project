import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDecription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const navigate = useNavigate();
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

    const submitHandler= async (e) => {
      e.preventDefault()
      const updateProducts = {
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
      }
      const result = await updateProduct(updateProducts)
      if(result.error) {
        toast.error(result.error);
      
      } else {
        toast.success('Product updated')
        navigate('/admin/productslist')
      }
    }
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDecription(product.description);
    }
  }, [product]);

  return <>
  <Link to='/admin/productslist' className='btn btn-light my-3'>
  Go Back
  </Link>
  <FormContainer>
    <h1>
      Edit Product
    </h1>
    {
      loadingUpdate && <Loader/>
    }
    {isLoading ? <Loader/> : error ? <Message>
      {error}
    </Message>:(
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="price" placeholder="Enter price" value={price} onChange={(e)=> setPrice(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="brand">
          <Form.Label>brand</Form.Label>
          <Form.Control type="brand" placeholder="Enter brand" value={brand} onChange={(e)=> setBrand(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock" className="my-2">
          <Form.Label>countInStock</Form.Label>
          <Form.Control type="number" placeholder="Enter countInStock" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e)=> setCategory(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>description</Form.Label>
          <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e)=> setDecription(e.target.value)}>

          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Update
        </Button>
      </Form>
    )}
  </FormContainer>
  </>;
};

export default ProductEditScreen;
