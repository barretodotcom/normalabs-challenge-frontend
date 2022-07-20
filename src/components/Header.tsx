import './Header.css'
import logo from '../assets/normatel-logo.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function Header() {

    const { user, signOut } = useContext(AuthContext);

    return (
        <nav className='navbar'>



            {user ?
                <div className="navbar-auth">
                    <div className='logo-container'>
                        <img className='logo' src={logo} />
                    </div>
                    <p className='poppins pointer header-label'><Link to="/profile">PERFIL</Link></p>
                    <p className='poppins pointer header-label'><Link to="/paychecks">CONTRA-CHEQUES</Link></p>

                    <div className='button-container-logout'>
                        <button onClick={e => signOut()} className='button logout'>
                            <p className='button-label-logout'>LOGOUT</p>
                        </button>
                    </div>

                </div>
                :
                <>
                    <div className='logo-container'>
                        <img className='logo' src={logo} />
                    </div>

                    <div className='nav-label'>
                        <p className='poppins pointer'><Link to="/">HOME</Link></p>
                        <p className='poppins pointer'><Link to="/funcionabillities">FUNCIONALIDADES</Link></p>
                    </div>

                    <div className='button-container'>
                        <Link to="/login" className='button login'>
                            <p className='button-label'>FAÇA LOGIN</p>
                        </Link>
                        <Link to="/create-account" className='button create-account'>
                            <p className='button-label'>CRIE SUA CONTA</p>
                        </Link>
                    </div>
                </>
            }
        </nav>
    )
}