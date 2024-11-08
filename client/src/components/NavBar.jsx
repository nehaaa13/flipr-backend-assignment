import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
    const [user, , , , , , logoutUser] = useContext(AuthContext); // Ensure you access logoutUser correctly
    return (
        <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
            <Container>

                <h2>

                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>  
                    <Link to="/" className="link-light text-decoration-none ms-2 ">E-commerce</Link>
                </h2>
                {user && (<Stack direction="horizontal" gap={5}>
                    <Link  to="/products" className="link-light text-decoration-none">Products</Link>
                    <Link  to="/addProduct" className="link-light text-decoration-none">Add Products</Link>
                </Stack>
                )}
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {user && (
                            <>
                                <Link onClick={() => logoutUser()} to="/login" className="link-light text-decoration-none">Logout</Link>
                            </>
                        )}
                        {!user && (<>
                            <Link to="/login" className="link-light text-decoration-none">Login</Link>
                            <Link to="/register" className="link-light text-decoration-none">Register</Link>
                        </>
                        )
                        }
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;