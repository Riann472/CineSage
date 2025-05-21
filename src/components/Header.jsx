import { FaFilm } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const Header = () => {
    const navigate = useNavigate()
    const { authState, setAuthState } = useContext(AuthContext)
    return (
        <header>
            <div className={styles.logo}>
                <FaFilm /> <h1>CineSage</h1>
            </div>
            <ul>
                {!authState.logged ? (
                    <>
                        <li><Link to='/'>Register</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to='/home'>Home</Link></li>
                        <li><p onClick={() => {
                            localStorage.removeItem('token')
                            setAuthState({
                                id: 0,
                                user: "",
                                logged: false
                            })
                            navigate('/login')
                        }}>Sair</p></li>
                    </>
                )}
                {/* <li><a href="#">Admin Area</a></li> */}
            </ul>
        </header>
    )
}

export default Header