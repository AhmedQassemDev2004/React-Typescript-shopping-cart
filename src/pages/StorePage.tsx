import {ReactElement, useEffect, useState} from "react";
import ProductItem, {ProductType} from "../components/ProductItem.tsx";
import {Col, Row} from "react-bootstrap";

export default function StorePage():ReactElement {
    const [products,setProducst] = useState<ProductType[]>([]);
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(()=>{
        (async function(){
            setLoading(true);
            const res = await fetch('https://fakestoreapi.com/products');
            setLoading(false);
            setProducst(await res.json());
        })()
    },[]);


    return (
        loading ?
            <h1>Loading...</h1>
            :
            <Row lg={3} md={2} sm={1} className={'g-3'}>
                {products.map(item =><Col><ProductItem item={item} key={item.id} /></Col>)}
            </Row>
    )
}