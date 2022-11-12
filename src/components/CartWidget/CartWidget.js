import cart from './assets/cart.svg'
import './CartWidget.css'
import { useContext } from 'react'
import { CartContext } from "../../CartContext/CartContext"
import { Link } from 'react-router-dom'


const CartWidget = () => {
        const { totalQuantity } = useContext (CartContext);
        return (
                <div className="container-widget">
                        <Link to='/cart'>  <img className='widget' src={cart} alt="cart" /></Link>
                        
                        <div className="cart-span">
                        <sup>{totalQuantity}</sup>
                        </div>
                </div>
        
        
        );
}


export default CartWidget

