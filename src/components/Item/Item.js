import '../Item/Item.css'
import { Link } from 'react-router-dom'

const Item = ({ id, img, name, category, price }) => {
  return (
    <div className='containerCard'>
      <div className='card' key={id}>
        <div className='imagen'>
          <img src={img} alt="" />
        </div>
        <div className="details">
          <h3>{name}</h3>
          <h5>{category}</h5>
          <p>${price}</p>
        </div>
        <Link className="btn-63" to = {`/detail/${id}`}><span>Ver detalle</span></Link>

      </div>
    </div>
  )

}

export default Item