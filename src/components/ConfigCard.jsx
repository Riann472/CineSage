import { MdOutlineMovieCreation } from "react-icons/md";

import styles from '../../css/components_css/ConfigCard.module.css'
import { Link } from "react-router-dom";

const ConfigCard = ({ image, title, path }) => {
    return (
        <Link to={path}>
            <div className={styles.configCard}>
                {image}
                <h3>{title}</h3>
            </div>
        </Link>
    )
}

export default ConfigCard