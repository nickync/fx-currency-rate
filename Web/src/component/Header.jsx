import { Navbar, NavbarBrand } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar className="py-0" variant="dark" bg="dark">
        <NavbarBrand className="mx-auto fw-bold text-success">FX currency finder</NavbarBrand>
    </Navbar>
  )
}