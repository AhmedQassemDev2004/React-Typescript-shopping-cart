import {ReactElement} from "react";
import {Button, Card} from 'react-bootstrap';
import {useCart} from "../context/CartContext.tsx";
export type ProductType = {
    id:number,
    title:string,
    price:number,
    image:string
}

type ProductItemProps = {
    item:ProductType
}
export default function ProductItem({item}:ProductItemProps):ReactElement {
    const {
        cartItems,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart
    } = useCart();

    const quantity = getItemQuantity(item.id);
    console.log(cartItems)
    return (
        <Card>
            <Card.Img
                variant={'top'}
                src={item.image}
                height={'200px'}
                style={{objectFit:'contain',padding:"10px"}}
            />
            <Card.Body>
                <Card.Title className={'d-flex justify-content-between align-items-baseline'}>
                    <span className={'fs-2'}>{item.title}</span>
                    <span className={'text-muted'}>${item.price}</span>
                </Card.Title>
                <div className={'mt-3'}>
                    {
                        quantity == 0 ?
                            <Button className={'w-100'} onClick={()=>increaseCartQuantity(item.id)}>
                                + Add to cart
                            </Button>
                            :
                            <div className={'d-flex gap-3 justify-content-center'}>
                                <Button onClick={()=>increaseCartQuantity(item.id)} variant={'outline-primary'}>+</Button>
                                <div><span className={'fs-3 fw-bold'}>{quantity}</span> in the cart</div>
                                <Button onClick={()=>decreaseCartQuantity(item.id)} variant={'outline-primary'}>-</Button>
                                <Button variant={'danger'} onClick={()=>removeFromCart(item.id)}>Remove</Button>
                            </div>
                    }

                </div>
            </Card.Body>
        </Card>
    )
}