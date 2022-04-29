import { CartItemType } from "../App"
import { CartItem } from "../CartItem/CartItem"
import { Wrapper } from "./Cart.style"

type Props={
    cartItems:CartItemType[],
    addToCart:(clickedItem:CartItemType)=>void,
    removeFromCart:(id:number)=>void
}

export const Cart:React.FC<Props>=({cartItems,addToCart,removeFromCart})=>{
const calculateTotal=(items:CartItemType[])=>items.reduce((a,b)=>a+(b.amount*b.price),0)
    return ( <Wrapper>
        <h2>Your Shopping Cart</h2>
        {cartItems.length ===0? <p>No items in cart.</p>:null }
        {cartItems.map(item=> <CartItem
        key={item.id}
        item={item}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        /> )}
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper> )
}