import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import { Table, Alert, Container, Button, Modal, Form } from "react-bootstrap";

const ProductList = () => {
    const { productList, errorMessage, fetchProducts, updateProduct, deleteProduct } = useContext(ProductContext);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

    // Handle delete button click
    const handleDeleteClick = async (productId) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            const result = await deleteProduct(productId);
            if (result.success) {
                alert("Product deleted successfully!");
                fetchProducts(); // Refresh product list
            } else {
                alert(result.message || "Failed to delete product.");
            }
        }
    };

    // Existing update functions
    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        setUpdatedData(product);
        setShowUpdateModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdateSubmit = async () => {
        try {
            const result = await updateProduct(selectedProduct._id, updatedData);
            if (result.success) {
                alert("Product updated successfully!");
                setShowUpdateModal(false);
                fetchProducts(); // Refresh product list
            } else {
                alert(result.message || "Failed to update product.");
            }
        } catch (error) {
            alert("An error occurred while updating the product.");
        }
    };

    return (
        <Container>
            <h2>Product List</h2>
            
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {productList.length === 0 ? (
                <Alert variant="info">No products found.</Alert>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>Rs. {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product._id}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleUpdateClick(product)}>
                                        Update
                                    </Button>{' '}
                                    <Button variant="danger" onClick={() => handleDeleteClick(product._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header className="text-dark" closeButton>
                    <Modal.Title className="text-dark text-center">Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label className="text-dark fw-bold">Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={updatedData.name || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label className="text-dark fw-bold">Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={updatedData.description || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label className="text-dark fw-bold">Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={updatedData.price || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label className="text-dark fw-bold">Category</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={updatedData.category || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductList;
