import { Container, NavLink } from "react-bootstrap"
const Layout = ({ children }) => {

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <NavLink href="/" className="text-light">Home</NavLink>
      </li>
    </ul>
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