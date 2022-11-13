import React from 'react'
import '../ItemCart/ItemCart.css'
import { CartContext } from '../../CartContext/CartContext'
import { useContext } from 'react'



const ItemCart = ({id, img, name, price, count}) => {
    const {removeItem} = useContext (CartContext);

return (    
    <div className='containerCart'>


        <h1 className="name">{name}</h1>
        <p className="price">Precio U: ${price}</p>
        <p className="SubTotal">Subtotal: ${count * price}</p>
        <button onClick={()=>removeItem(id)}> Eliminar</button>

    </div>
)
}

export default ItemCart