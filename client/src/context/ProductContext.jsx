import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest, putRequest } from "../utils/services";

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        category: ''
    });

    const [productList, setProductList] = useState([]); // State for product list
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to update product data
    const updateProductData = useCallback((field, value) => {
        setProductData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    }, [productData]);

    // Function to submit the form data
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        const { name, description, price, category } = productData;
    
        // Price greater than 0
        const priceValue = parseFloat(price);  
        if (isNaN(priceValue) || priceValue <= 0) {
            setErrorMessage('Price should be a positive number.');
            return;
        }
    
        // Update productData 
        const updatedProductData = { ...productData, price: priceValue };
    
        // Sending data
        const response = await postRequest(`${baseUrl}/addproduct`, updatedProductData);
    
        if (response.error) {
            setErrorMessage(response.message || 'Failed to add product.');
        } else {
            setSuccessMessage(`Product added successfully!`);
            setProductData({
                name: '',
                description: '',
                price: '',
                category: ''
            });
            fetchProducts(); // Fetch updated products list
        }
    }, [productData]);

    // Function to fetch product list from the backend
    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(`${baseUrl}/products`);
            console.log("response", response);
            
            const data = await response.json();
            if (data.error) {
                setErrorMessage(data.message || "Failed to load products.");
            } else {
                setProductList(data); // Update product list
            }
        } catch (error) {
            setErrorMessage("An error occurred while fetching products.");
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    //Update product
    const updateProduct = async (productId, updatedData) => {
    try {
        const response = await putRequest(`${baseUrl}/updateproduct/${productId}`, updatedData);

        if (response.error) {
            throw new Error(response.message || "Failed to update product.");
        }

        await fetchProducts(); 

        return { success: true, message: "Product updated successfully." };
    } catch (error) {
        return { success: false, message: error.message };
    }
};


// Delete product

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${baseUrl}/deleteproduct/${productId}`, { method: 'DELETE' });

        const data = await response.json();
        if (data.error) {
            throw new Error(data.message || "Failed to delete product.");
        }

        await fetchProducts();

        return { success: true, message: "Product deleted successfully." };
    } catch (error) {

        return { success: false, message: error.message };
    }
};


    return (
        <ProductContext.Provider
            value={{
                productData,
                productList, // Make product list available in context
                errorMessage,
                successMessage,
                updateProductData,
                handleSubmit,
                fetchProducts,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
