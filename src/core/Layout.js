import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from 'react-bootstrap/NavLink';

import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom'
import { isAuth, signout } from '../helpers/helpers';

const Layout = ({ children }) => {
  const navigate = useNavigate()
  const nav = () => (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav className="me-auto">
          <CustomLink as={Link} to="/" >Home</CustomLink>
          {!isAuth() && (
            <>
              <CustomLink as={Link} to="/signin" >Signin</CustomLink>
              <CustomLink as={Link} to="/signup" >Signup</CustomLink>
            </>
          )}
          {isAuth() && (
            <CustomLink as={Link}
              to={isAuth().role === 'admin' ? '/admin' : 'private'} >{isAuth().name}</CustomLink>
          )}
          {isAuth() && (
            <>
              <span style={{ cursor: 'pointer' }} className="nav-link" onClick={() => {
                signout(() => {
                  navigate('/', { replace: true })
                })
              }}>SignOut
              </span>
            </>

          )}
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

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <NavLink className={isActive ? 'active' : ''}
      as={Link} to={to} {...props}> {children}</NavLink >
  )
}

export default Layout