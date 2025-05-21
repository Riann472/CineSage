import { Link } from 'react-router-dom';
import styles from '../../css/components_css/Card.module.css'

const Card = ({ id, src, alt, title }) => {
    return (
        <Link to={`/filme/${id}`} className={styles.card}>
            <img
                src={src}
                alt={alt}
                onError={(e) => {
                    e.target.onerror = null; // evita loop
                    e.target.src = 'https://placehold.co/150x180.png?text=Sem+Imagem';
                }}
            />
            <h3>{title}</h3>
        </Link>
    )
}

export default Card