import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../css/pages_css/Categorias.module.css'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext'

const Categorias = () => {
    const { authState } = useContext(AuthContext)

    const [categorias, setCategorias] = useState([])
    const [selecionadas, setSelecionadas] = useState([])
    const navigate = useNavigate()

    const userId = authState.id // ou use authState.id

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/getcategorias`)
            .then(res => setCategorias(res.data))
            .catch(err => console.error('Erro ao buscar categorias:', err))
    }, [])

    const toggleCategoria = (id) => {
        setSelecionadas(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const handleAvancar = () => {
        console.log(userId)
        axios.post(`${import.meta.env.VITE_API_URL}/addusercat`, {
            userId,
            categoriaIds: selecionadas // certifique-se de usar o nome certo do campo!
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error)
                } else {
                    console.log(res.data)
                    navigate('/home')
                }
            })
            .catch(err => console.error('Erro ao enviar categorias:', err))
    }

    const handlePular = () => {
        navigate('/home')
    }

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Escolha suas categorias</h1>

            <div className={styles.grid}>
                {categorias.map(cat => (
                    <button
                        key={cat.id}
                        className={`${styles.card} ${selecionadas.includes(cat.id) ? styles.selected : ''}`}
                        onClick={() => toggleCategoria(cat.id)}
                        type="button"
                    >
                        {cat.nome}
                    </button>
                ))}
            </div>

            <div className={styles.actions}>
                <button className={styles.skipButton} onClick={handlePular}>
                    Agora não
                </button>
                <button
                    className={styles.nextButton}
                    onClick={handleAvancar}
                    disabled={selecionadas.length === 0}
                >
                    Avançar
                </button>
            </div>
        </main>
    )
}

export default Categorias
