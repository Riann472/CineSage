import { FaFilm } from "react-icons/fa";
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const Header = () => {
    const { authState } = useContext(AuthContext)
    return (
        <header>
            <div className={styles.logo}>
                <FaFilm /> <h1>CineSage</h1>
            </div>
            <ul>
                {!authState ? (
                    <>
                        <li><Link to='/'>Register</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/login'>Home</Link></li>
                    </>
                )}
                {/* <li><a href="#">Admin Area</a></li> */}
            </ul>
        </header>
    )
}

export default Header