import { ChevronDown, ChevronUp } from '../icons';
import {removeItem,amountDecrease,amountIncrease} from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux';
interface Item{
    id:string;
    img:string;
    title:string;
    price:string;
    amount:number
}

const CartItem=({id,img,title,price,amount}:Item)=>{
    const dispatch=useDispatch()
return(<article className='cart-item'>
    <img src={img} alt="" />
    <div>
       <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={()=>{
            dispatch(removeItem(id))
        }}>remove</button>
    </div>
    <div >
        <button className='amount-btn' custom-attribute='increase' onClick={()=>{
            dispatch(amountIncrease(id))
        }}>
        <ChevronUp/>
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' data-type='decrease' onClick={()=>{
            dispatch(amountDecrease(id))
        }}>
        <ChevronDown/>
        </button>
    </div>
    
</article>)
}
export default CartItem