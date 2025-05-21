import styles from '../../css/components_css/Card.module.css'

const Card = ({ src, alt, title }) => {
    return (
        <div className={styles.card}>
            <img src={src} alt={alt} />
            <h3>{title}</h3>
        </div>
    )
}

export default Card