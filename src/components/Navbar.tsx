import {Navbar as NavbarBs, Container, Nav, NavbarBrand, Button, Badge} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import {ReactElement} from "react";
import {useCart} from "../context/CartContext.tsx";

export default function Navbar():ReactElement {
    const {cartQuantity,openCart} = useCart();

    return (
        <NavbarBs className={'bg-white shadow-sm mb-3'}>
            <Container>
                <NavbarBrand>React cart</NavbarBrand>
                <Nav className={'me-auto align-items-center'}>
                    <Nav.Link to='/' as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to='/store' as={NavLink}>
                        Store
                    </Nav.Link>
                </Nav>
                {cartQuantity > 0 &&
                    <Nav.Link>
                        <Button onClick={openCart} variant={'outline-primary'} className={'rounded-pill'}>
                            Cart <Badge bg={'danger'} className={'ms-1'}>{cartQuantity}</Badge>
                        </Button>
                    </Nav.Link>
                }
            </Container>
        </NavbarBs>
    )
}