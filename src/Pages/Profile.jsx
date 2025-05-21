import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'
import styles from '../../css/pages_css/Profile.module.css'

const Profile = () => {
    const { authState } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({
        user: '',
        categorias: []
    })
    const [todasCategorias, setTodasCategorias] = useState([])
    const [selecionadas, setSelecionadas] = useState([])
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')

        // Buscar info do usuário
        axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: { token }
        })
            .then(res => {
                if (!res.data.error) {
                    setUserInfo({
                        user: res.data.user,
                        categorias: res.data.categorias || []
                    })
                    // Inicializa selecionadas com categorias atuais do usuário
                    const idsCategorias = (res.data.categorias || []).map(c => c.id)
                    setSelecionadas(idsCategorias)
                } else {
                    console.error('Erro:', res.data.error)
                }
            })
            .catch(err => console.error('Erro ao carregar perfil:', err))

        // Buscar categorias do endpoint getcategorias
        axios.get(`${import.meta.env.VITE_API_URL}/getcategorias`)
            .then(res => setTodasCategorias(res.data || []))
            .catch(err => console.error('Erro ao carregar categorias:', err))
    }, [])

    const toggleCategoria = (id) => {
        setSelecionadas(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const handleAdicionarCategorias = () => {
        const token = localStorage.getItem('token')
        const userId = authState.id

        // Envia a lista completa atualizada das categorias selecionadas
        axios.post(`${import.meta.env.VITE_API_URL}/addusercat`, {
            userId,
            categoriaIds: selecionadas
        }, {
            headers: { token }
        })
            .then(res => {
                if (!res.data.error) {
                    setMensagem('Categorias atualizadas com sucesso!')
                    // Atualiza o estado local com as categorias atuais do usuário
                    setUserInfo(prev => ({
                        ...prev,
                        categorias: todasCategorias.filter(cat => selecionadas.includes(cat.id))
                    }))
                } else {
                    setMensagem('Erro: ' + res.data.error)
                }
            })
            .catch(err => {
                console.error('Erro ao atualizar categorias:', err)
                setMensagem('Erro ao atualizar categorias.')
            })
    }

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.titulo}>Perfil do Usuário</h1>
            </div>

            <div className={styles.card}>
                <p><strong>Usuário:</strong> {userInfo.user}</p>
                <div>
                    <strong>Categorias:</strong>
                    <ul className={styles.categoriaLista}>
                        {userInfo.categorias.length > 0 ? (
                            userInfo.categorias.map((cat) => (
                                <li key={cat.id}>{cat.nome}</li>
                            ))
                        ) : (
                            <li>Nenhuma categoria selecionada</li>
                        )}
                    </ul>
                </div>

                <div className={styles.selecaoCategorias}>
                    <h3>Selecionar Categorias</h3>
                    <div className={styles.grid}>
                        {todasCategorias.map(cat => (
                            <button
                                key={cat.id}
                                className={`${styles.cardCat} ${selecionadas.includes(cat.id) ? styles.selected : ''}`}
                                onClick={() => toggleCategoria(cat.id)}
                                type="button"
                            >
                                {cat.nome}
                            </button>
                        ))}
                    </div>

                    <button
                        className={styles.botao}
                        onClick={handleAdicionarCategorias}
                        disabled={selecionadas.length === 0}
                    >
                        Aplicar Categorias
                    </button>

                    {mensagem && <p className={styles.mensagem}>{mensagem}</p>}
                </div>
            </div>
        </main>
    )
}

export default Profile
