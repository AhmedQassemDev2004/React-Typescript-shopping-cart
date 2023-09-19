import {createContext, ReactElement, ReactNode, useContext, useState} from "react";
import Cart from "../components/Cart.tsx";

type CartContextType = {
    cartItems:CartItemType[],
    cartQuantity:number,
    isOpen:boolean,
    getItemQuantity:(id:number) => number,
    increaseCartQuantity:(id:number) => void,
    decreaseCartQuantity:(id:number) => void,
    removeFromCart:(id:number) => void,
    openCart:()=>void,
    closeCart:()=>void,
}

export type CartItemType = {
    [index:string]:number
    id:number,
    quantity:number
}

type CartProviderProps = {
    children:ReactNode
}


const cartContext = createContext({} as CartContextType)

export function useCart() {
    return useContext(cartContext);
}
export function CartProvider({children}:CartProviderProps): ReactElement{
    const initCartItems: CartItemType[] | [] = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cartItems,setCartItems] = useState<CartItemType[]>(initCartItems);

    const [isOpen,setIsOpen] = useState<boolean>(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    function getItemQuantity(id:number) {
        return cartItems.find(item=>item.id ===id)?.quantity || 0;
    }

    function increaseCartQuantity(id:number) {
        setCartItems(items => {
            if(items.find(item=>item.id === id) == null) {
                return [...items,{id,quantity:1}]
            } else {
                return items.map(item => {
                    if(item.id == id) {
                        return {...item,quantity:item.quantity + 1}
                    }
                    return item;
                })
            }
        })
    }

    function decreaseCartQuantity(id:number) {
        setCartItems(items => {
            if(items.find(item=>item.id === id)?.quantity === 1) {
                return items.filter(item => item.id != id);
            } else {
                return items.map(item => {
                    if(item.id == id) {
                        return {...item,quantity:item.quantity - 1}
                    }
                    return item;
                })
            }
        })
    }

    function removeFromCart(id:number) {
        setCartItems(items => items.filter(item => item.id != id))
    }

    let cartQuantity = 0;
    for (const item in cartItems) {
        cartQuantity += cartItems[item].quantity;
    }

    return (
        <cartContext.Provider value={{
            cartItems,
            cartQuantity,
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            isOpen
        }}>
            {children}
            <Cart />
        </cartContext.Provider>
    )
}
