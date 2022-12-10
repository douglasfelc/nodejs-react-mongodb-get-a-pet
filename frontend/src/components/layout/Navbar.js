import { useContext } from 'react'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'

import Logo from '../../assets/img/logo.png'

// contexts
import { Context } from '../../contexts/UserContext'

function Navbar() {

    const { authenticated, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get A Pet" />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adopt</Link>
                </li>
                {authenticated ? (
                    <>
                        <li onClick={logout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/Register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
