import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'

const ProductScreen = () => {
    
    const {id: productId} = useParams();

    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);

  return (
    <>
    <Link className='btn btn-light my-3' to='/'>
    Go back
    </Link>
    {isLoading ? (<div>Loading ..</div>) : error ? (<div>{error?.data?.message || error.error}</div>) :(<Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews}`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    Price: ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
        </Col>

        <Col md={3}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>
                        price:
                        </Col>
                        <Col>
                        <strong>${product.price}</strong>

                        </Col>
                    </Row>
                </ListGroup.Item>
                
                <ListGroup.Item>
                    <Row>
                        <Col>
                        Status
                        </Col>
                        <Col>
                        <strong>${product.countInStock > 0? 'In Stock':'Out Of Stock'}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button className='btn-block' disabled={product.countInStock === 0}>Add To Cart</Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
    </Row>)}
    
    </>
  )
}

export default ProductScreen