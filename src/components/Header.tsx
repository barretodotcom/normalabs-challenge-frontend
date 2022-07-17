import './Header.css'
import logo from '../assets/normatel-logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <nav className='navbar'>
            <div className='logo-container'>
                <img className='logo' src={logo} />
            </div>

            <div className='nav-label'>
                <p className='poppins pointer'><Link to="/">HOME</Link></p>
                <p className='poppins pointer'><Link to="/funcionabillities">FUNCIONALIDADES</Link></p>
                <Link to="/about-me"> <p className='poppins pointer'>SOBRE MIM</p></Link>
            </div>

            <div className='button-container'>
                <Link to="/login" className='button login'>
                    <p className='button-label'>FAÇA LOGIN</p>
                </Link>
                <Link to="/create-account" className='button create-account'>
                    <p className='button-label'>CRIE SUA CONTA</p>
                </Link>
            </div>

        </nav>
    )
}