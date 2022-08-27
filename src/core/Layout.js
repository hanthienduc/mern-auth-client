import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';

import { Link } from 'react-router-dom'

const Layout = ({ children }) => {

  const nav = () => (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <NavLink as={Link} to="/" >Home</NavLink>
          <NavLink as={Link} to="/signup" >Signup</NavLink>
        </Nav>
      </Container>
    </Navbar>
  )

  return (
    <>
      {nav()}
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout