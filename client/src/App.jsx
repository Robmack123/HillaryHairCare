import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar color="info" expand="md" className="fixed-top">
        <NavbarBrand href="/">Hillary Hair Care</NavbarBrand>
        <Nav navbar className="ml-auto">
          <NavItem>
            <NavLink href="appointments">Appointments</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/customers">Clients</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/stylists">Stylists</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/services">Services</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default App;
