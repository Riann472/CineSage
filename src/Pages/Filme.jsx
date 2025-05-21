import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../../css/pages_css/Filme.module.css'; // Crie esse arquivo com o estilo

const Filme = () => {
    const { id } = useParams();  // pega o id da URL
    const navigate = useNavigate();

    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/filmes/${id}`)
            .then(res => {
                setFilme(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar o filme:", err);
                setLoading(false);
                // Redireciona para home caso não ache o filme
                navigate('/home');
            });
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (!filme) return <p>Filme não encontrado.</p>;

    return (
        <main>
            <div className={styles.container}>
                <h1 className={styles.title}>{filme.nome}</h1>
                <img src={filme.img} alt={`Imagem do filme ${filme.nome}`} className={styles.image} onError={(e) => {
                    e.target.onerror = null; // evita loop
                    e.target.src = 'https://placehold.co/400x500.png?text=Sem+Imagem';
                }} />
                <p className={styles.description}>{filme.descricao}</p>
            </div>
        </main>
    );
}

export default Filme;
