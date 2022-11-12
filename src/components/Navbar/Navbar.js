import tools from '../CartWidget/assets/tools.svg'
import "./Navbar.css";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <header>
                <div className="img-logo">
                    <img src={tools} alt="logo" />
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>
                              Home
                            </Link>
                        </li>
                        <li>
                            <Link to= '/category/Herramientas Manuales'>
                            Herramientas Manuales
                            </Link>
                        </li>
                        <li>
                            <Link to= '/category/Herramientas Electricas'>
                            Herramientas Electricas
                            </Link>
                        </li>

                    </ul>
                </nav>
                <div className= "cartimage">
                 <CartWidget />
                 </div>
            </header>
        </div>
    );
}