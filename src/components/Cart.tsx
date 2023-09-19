import {useCart} from "../context/CartContext.tsx";
import {ReactElement, useEffect, useState} from "react";
import {Button, Image, Offcanvas, Stack} from 'react-bootstrap';
import {CartItemType} from '../context/CartContext.tsx';
import {ProductType} from "./ProductItem.tsx";

function CartItem({item}: { item:CartItemType }):ReactElement {
    const [product,setProduct] = useState<ProductType>({} as ProductType);

    const {removeFromCart} = useCart();

    useEffect(()=>{
        (async function() {
            const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
            setProduct(await res.json());
        })()
    },[product])

    return (
        <Stack direction={'horizontal'} gap={2}>
            <div style={{width:"125px",height:"75px"}}>
                <Image src={product.image} style={{width:"100%",height:"100%",objectFit:"contain",backgroundColor:"#e1e1e1"}} />
            </div>
            <div className={'me-auto d-flex flex-column'}>
                <span>{product.title}</span>
                <span className={'text-muted'}>${product.price}</span>
            </div>
            <div className={'ms-auto d-flex gap-2 align-items-center'}>
                <span className={'fs-4'}>${product.price * item.quantity}</span>
                <Button onClick={()=>removeFromCart(item.id)} variant={'outline-danger'}>&times;</Button>
            </div>
        </Stack>
    )
}

export default function Cart():ReactElement {
    const {isOpen,closeCart,cartItems} = useCart();

    return (
        <Offcanvas show={isOpen} placement={'end'} onHide={closeCart}>
            <Offcanvas.Header closeButton>
               <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item=>(
                        <CartItem item={item} />
                    ))}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}