import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
const url:string="https://course-api.com/react-useReducer-cart-project"

interface Item{
    id:string;
    img:string;
    title:string;
    price:string;
    amount:number
}
const cartItem:Item[]=[]
const initialState={
    cartItems:cartItem,
    amount:4,
    total:0,
    isLoading:true
} 

export const getCartItems=createAsyncThunk('/cart/getCart',()=>{
    return fetch(url).then(resp=>resp.json()).catch((err)=>console.log(err))
})
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{
            state.cartItems=[];
        },
        removeItem:(state,action: PayloadAction<string>)=>{
            const itemId=action.payload
            state.cartItems=state.cartItems.filter((item)=>item.id!==itemId)

        },
        amountIncrease:(state,action: PayloadAction<string>)=>{
            const itemId=action.payload
            const item=state.cartItems.find((item)=>item.id===itemId)!
            item.amount++
        },
        amountDecrease:(state,action: PayloadAction<string>)=>{
            const itemId=action.payload
            const item=state.cartItems.find((item)=>item.id===itemId)!
            item.amount--
        },
        calculateTotal:(state)=>{
            var amount:number =0
            var total:number =0
            state.cartItems.forEach((item)=>{
                amount+=item.amount
                total+=item.amount * Number(item.price)
            })
            state.amount=amount
            state.total=total
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(getCartItems.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(getCartItems.fulfilled,(state,action)=>{
            state.isLoading=false
            state.cartItems=action.payload
        })
        builder.addCase(getCartItems.rejected,(state)=>{
            state.isLoading=false
        })
    }
})
export const {clearCart,removeItem,amountIncrease,amountDecrease,calculateTotal}=cartSlice.actions
export default cartSlice.reducer