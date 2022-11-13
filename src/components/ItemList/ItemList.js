import Item from "../Item/Item"
import "../ItemList/ItemList.css"



const ItemList = ({products, setPage }) => {
  return(
          
      <div className='ListGroup'>
          {products.map(prod => <Item key={products.id} {...prod} setPage={setPage}/>)}
      </div>    
  )
}


export default ItemList