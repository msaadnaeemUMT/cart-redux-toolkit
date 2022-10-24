import Navbar from './components/Navbar'
import CartContainer from './components/CartContainer';
import { useEffect} from 'react';
import { AppDispatch } from './store';
import { useSelector } from './components/CustomSelector';
import { calculateTotal,getCartItems } from './features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import Modal from './components/Modal';
function App() {
  const {cartItems,isLoading}=useSelector((state)=>state.cart)
  const {isOpen}=useSelector((state)=>state.modal)
  const dispatch:AppDispatch=useDispatch()
  useEffect(()=>{
    dispatch(calculateTotal())
  },[cartItems])

  useEffect(()=>{
    dispatch(getCartItems())
  },[])
  if(isLoading){
    return(<div className='loading'>
      <h1>Loading....</h1>
    </div>)
  }
  return (
  <main>
    {isOpen && <Modal/>}
    <Navbar/>
    <CartContainer/>
    </main>)
}
export default App;
