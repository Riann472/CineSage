import styles from '../../css/pages_css/Home.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";
import Card from '../components/Card';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/')
        }

    }, [])
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
                    <Card src="https://m.media-amazon.com/images/M/MV5BOGM0NGY3ZmItOGE2ZC00OWIxLTk0N2EtZWY4Yzg3ZDlhNGI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                        alt="Imagem Peaky Blinders" title="Peaky Blinders" />
                </div>
            </section>
            <section className={styles.movies}>
                <h1>Todos os filmes</h1>
                <div className={styles.movieSection}>
                    <Card src="https://m.media-amazon.com/images/M/MV5BOGM0NGY3ZmItOGE2ZC00OWIxLTk0N2EtZWY4Yzg3ZDlhNGI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
                        alt="Imagem Peaky Blinders" title="Peaky Blinders" />
                </div>
            </section>
        </main>
    )
}

export default Home