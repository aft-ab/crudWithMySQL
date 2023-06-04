import Contact from "./components/Contact";
import About from "./components/About";
import Login from "./components/Login";
import Home from "./components/Home";
import Error from "./components/Error"
import Register from "./components/Register";
import { Routes, Route, Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Admin from './components/Admin_Home';
import Customer from './components/Customer';
import Cart from './components/cart';
import Payment from './components/payment';



const App = () => {
  return (
    <>


      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <Navbar.Brand href="/">OSM</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/About">About Us</Nav.Link>
              <Nav.Link href="/Contact">Contact Us</Nav.Link>
              <Nav.Link href="/Login">Login</Nav.Link>
              <Nav.Link href="/Register">Register</Nav.Link>
       
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Payment" element={<Payment />} />
      </Routes>

    </>

  );
}

export default App;
