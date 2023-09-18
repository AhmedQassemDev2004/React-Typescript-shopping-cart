import {Navbar as NavbarBs, Container, Nav, NavbarBrand} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

export default function Navbar() {
    return (
        <NavbarBs className={'bg-white shadow-sm mb-3'}>
            <Container>
                <NavbarBrand>React cart</NavbarBrand>
                <Nav>
                    <Nav.Link to='/' as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to='/store' as={NavLink}>
                        Store
                    </Nav.Link>
                </Nav>
            </Container>
        </NavbarBs>
    )
}