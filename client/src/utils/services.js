export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {

    const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
});
    const data = await response.json();
    
    if (!response.ok) {
        let message = data.message || data || "Failed to add product.";
        return { error: true, message };
    }
    
    return data;
};


export const getRequest= async(url)=>{
    const response = await fetch(url);

    const data = await response.json();

    if(!response.ok){
        let message = "An error occured...";

        if(data?.message){
            message = data.message;
        }

        return {error: true, message};
    }

    return data;
}; 

export const putRequest = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Parse JSON response
        const result = await response.json();

        // If the response is not OK, return error message
        if (!response.ok) {
            return { error: true, message: result.message || "Update failed" };
        }

        return result; // Return the parsed response data
    } catch (error) {
        return { error: true, message: error.message };
    }
};

export const deleteRequest = async (url) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Parse JSON response
        const result = await response.json();

        // If the response is not OK, return error message
        if (!response.ok) {
            return { error: true, message: result.message || "Delete failed" };
        }

        return { success: true, message: "Product deleted successfully." };
    } catch (error) {
        return { error: true, message: error.message || "An error occurred while deleting." };
    }
};
