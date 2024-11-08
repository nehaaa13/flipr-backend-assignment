import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import AddProduct from "./pages/addProduct";
import { AuthContext } from "./context/AuthContext";

import ProductList from "./pages/ProducList";

function App() {
  const [user] = useContext(AuthContext);
  
  return (
     <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={user ? <ProductList /> : <Login />} />
          <Route path="/register" element={user ? <AddProduct /> : <Register />} />
          <Route path="/login" element={user ? <AddProduct /> : <Login />} />
          <Route path="/products" element={user ? <ProductList /> : <Login />} />
          <Route path="/addProduct" element={user ? <AddProduct /> : <Login />} />         
        </Routes>
      </Container>
    </>
  )
}

export default App
