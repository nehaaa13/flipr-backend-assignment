import React, { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';
import { ProductContext } from '../context/ProductContext';

const AddProduct = () => {
    const {
        productData,
        errorMessage,
        successMessage,
        updateProductData,
        handleSubmit,
    } = useContext(ProductContext);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add New Product</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} controlId="productName" className="mb-3">
                    <Form.Label column sm={2}>Name:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={(e) => updateProductData("name", e.target.value)}
                            placeholder="Enter product name"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="productDescription" className="mb-3">
                    <Form.Label column sm={2}>Description:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={productData.description}
                            onChange={(e) => updateProductData("description", e.target.value)}
                            placeholder="Enter product description"
                            rows={3}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="productPrice" className="mb-3">
                    <Form.Label column sm={2}>Price:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={(e) => updateProductData("price", e.target.value)}
                            placeholder="Enter product price"
                            min="0"
                            step="0.01"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="productCategory" className="mb-3">
                    <Form.Label column sm={2}>Category:</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            name="category"
                            value={productData.category}
                            onChange={(e) => updateProductData("category", e.target.value)}
                            placeholder="Enter product category"
                        />
                    </Col>
                </Form.Group>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                <Stack direction="horizontal" gap={3}>
                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </Stack>
            </Form>
        </div>
    );
};

export default AddProduct;
