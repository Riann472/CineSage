import styles from '../../css/components_css/Card.module.css'

const Card = ({ src, alt, title }) => {
    return (
        <div className={styles.card}>
            <img
                src={src}
                alt={alt}
                onError={(e) => {
                    e.target.onerror = null; // evita loop
                    e.target.src = 'https://via.placeholder.com/300x450.png?text=Sem+Imagem';
                }}
            />
            <h3>{title}</h3>
        </div>
    )
}

export default Card