import { FaFilm } from "react-icons/fa";
import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
    return (
        <header>
            <div className={styles.logo}>
                <FaFilm /> <h1>CineSage</h1>
            </div>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                {/* <li><a href="#">Admin Area</a></li> */}
            </ul>
        </header>
    )
}

export default Header