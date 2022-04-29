import { Badge, Drawer, Grid, LinearProgress } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import {useState} from 'react'
import {useQuery} from 'react-query'
import {Wrapper,StyledButton} from './App.styles'
import { Cart } from './Cart/Cart'
import {Item} from './Item/Item'
export type CartItemType={
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

const getProducts=async ():Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json()
function App() {
  const[cartOpen,setCartOpen]=useState(false)
  const [cartItems,setCartItems]=useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const handleAddToCart =(clickedItem:CartItemType):void=>{
    const indexNumber:number=cartItems.findIndex((item:CartItemType)=>item.id===clickedItem.id)
    console.log(indexNumber);
    if(indexNumber===-1){
      setCartItems((prev:CartItemType[])=>[...prev,{...clickedItem,amount:1}])
    }else{
    setCartItems((prev:CartItemType[])=>[...prev.slice(0,indexNumber),{...prev[indexNumber],amount:prev[indexNumber].amount+1},...prev.slice(indexNumber+1)])
    }
  
  }
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };
  

  if(isLoading) return <LinearProgress/>
  if(error) return <div>Something is wrong...</div>
  return (
   <Wrapper>
     <Drawer anchor='right' open ={cartOpen} onClose={()=>setCartOpen(false)}>
      <Cart 
      cartItems={cartItems} 
      addToCart={handleAddToCart} 
      removeFromCart={handleRemoveFromCart}
      />
     </Drawer>
     <StyledButton onClick={()=>setCartOpen(true)} >
       <Badge badgeContent={getTotalItems(cartItems) } color='error'>
       <AddShoppingCart/>
       </Badge>
     </StyledButton>
     <Grid container spacing ={3}>
     {data?.map((item:CartItemType)=> <Grid item key={item.id} xs={12} sm={4}>
     <Item item={item} handleAddToCart={handleAddToCart}/> 
     </Grid>  )}
     </Grid>
   </Wrapper>
  );
}

export default App;
