const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const addProductRoute = require("./Routes/addProductRoute");
const updateProductRoute = require('./Routes/updateProductRoute'); 
const productRoute = require('./Routes/productRoute');
const deleteProductRoute = require('./Routes/deleteProductRoute');
const cartRoute = require('./Routes/cartRoute');


const app = express();
require("dotenv").config();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use(cors());
app.use("/api", userRoute);
app.use("/api", addProductRoute);  
app.use('/api', updateProductRoute);
app.use('/api', deleteProductRoute);
app.use('/api', productRoute);
app.use('/cart', cartRoute);

app.get("/", (req, res) => {
    res.send("Welcome to our API...");
});


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, resp) => {
    console.log(`Server running on port: ${port}`);
});

mongoose.connect(uri)
    .then(() => console.log("MongoDB connection established"))
    .catch((error) => console.log("MongoDB connection failed", error.message));
