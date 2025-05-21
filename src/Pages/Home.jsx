import styles from '../../css/pages_css/Home.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import Card from '../components/Card';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);

    const [todosFilmes, setTodosFilmes] = useState([]);
    const [recomendados, setRecomendados] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Buscar todos os filmes (sempre pode buscar, independente do id)
        axios.get(`${import.meta.env.VITE_API_URL}/filmes`)
            .then(res => setTodosFilmes(res.data))
            .catch(err => console.error('Erro ao buscar todos os filmes:', err));

        // Só faz a requisição de recomendados se o id for válido (diferente de 0)
        if (authState.id !== 0) {
            axios.get(`${import.meta.env.VITE_API_URL}/recomendados/${authState.id}`, {
                headers: { token }
            })
                .then(res => setRecomendados(res.data))
                .catch(err => {
                    console.error('Erro ao buscar recomendados:', err);
                    setRecomendados([]);
                });
        }

    }, [authState.id]);

    return (
        <main className={styles.main}>
            <form>
                <div>
                    <input type="text" placeholder='Pesquise um filme' />
                    <button><FaMagnifyingGlass /></button>
                </div>
            </form>

            <section className={styles.recommended}>
                <h1>Recomendados</h1>
                <div className={styles.movieSection}>
                    {recomendados.length > 0 ? (
                        recomendados.map(filme => (
                            <Card key={filme.id} id={filme.id} src={filme.img} alt={`Imagem ${filme.nome}`} title={filme.nome} />
                        ))
                    ) : (
                        <p>Nenhuma recomendação no momento.</p>
                    )}
                </div>
            </section>

            <section className={styles.movies}>
                <h1>Todos os filmes</h1>
                <div className={styles.movieSection}>
                    {todosFilmes.map(filme => (
                        <Card key={filme.id} id={filme.id} src={filme.img} alt={`Imagem ${filme.nome}`} title={filme.nome} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
