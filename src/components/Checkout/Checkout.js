import './Checkout.css'
import { useState, useContext } from "react"
import { CartContext } from "../../CartContext/CartContext"
import { collection, getDocs, query, where, documentId, writeBatch, addDoc } from 'firebase/firestore'
import { dataBase } from '../../service/Firebase/index.js'
import NotificationContext from "../../notification/NotificationService.js";
import { useNavigate } from "react-router-dom"



    const Checkout = () => {
    const [loading] = useState(false)
    const { cart, getTotal, clearCart } = useContext(CartContext);
    const { setNotification } = useContext(NotificationContext);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    
  
       const createOrder = async (e) => {
    
        e.preventDefault();
    
        if (!name && !phone && !email) {
          setNotification('error', 'Por favor rellene los campos obligatorios.');
        } else {
        const order = {
            buyer: {
              name: name,
              address: address,
              phone: phone,
              email: email,
            },
            products: cart.map((product) => ({
              id: product.id,
              name: product.name,
            })),
              total: getTotal (),
          };
    
        const batch = writeBatch(dataBase);
        const outOfStock = [];
        const ids = cart.map((prod) => prod.id);
        const productsRef = collection(dataBase, 'products');
        const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)) );
          
        const { docs } = productsAddedFromFirestore;
    
          docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;
    
        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const prodQuantity = productAddedToCart?.quantity;
    
            if (stockDb >= prodQuantity) {
              batch.update(doc.ref, { stock: stockDb - prodQuantity });
            } else {
              outOfStock.push({ id: doc.id, ...dataDoc });
            }
          });
    
          if (outOfStock.length === 0) {
            setNotification('error', 'Productos fuera del stock disponible');
          } else {
            await batch.commit();
    
            const orderRef = collection(dataBase, 'orders');
    
            const orderAdded = await addDoc(orderRef, order);
            setNotification('success', `Su orden se genero con exito! el id es: ${orderAdded.id}`);
            clearCart(cart);
            setTimeout(() => {
              navigate('/');
            }, 2000);
          }
        }
      };
    
      if(loading) {
        return <span class="loader">Procesando</span>
 
    }
      return (
        <div>
          <h1>Por favor completo los datos</h1>
          <div className="myForm">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-input"
              placeholder="Nombre"
            />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="form-input"
              placeholder="Direcci??n"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-input"
              placeholder="Email"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="form-input"
              placeholder="Tel??fono"
            />
          </div>
          <div className="buttons-order">
            <button class="button-checkout" onClick={createOrder}><span>Generar pedido</span></button>
    
          </div>
        </div>
      );
    };
    
    export default Checkout;