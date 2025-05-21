import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../../css/pages_css/Profile.module.css'

const Perfil = () => {
    const [userInfo, setUserInfo] = useState({
        user: '',
        categorias: []
    })

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: { token: localStorage.getItem('token') }
        })
            .then(res => {
                if (!res.data.error) {
                    setUserInfo({
                        user: res.data.user,
                        categorias: res.data.categorias || []
                    })
                } else {
                    console.error('Erro:', res.data.error)
                }
            })
            .catch(err => console.error('Erro ao carregar perfil:', err))
    }, [])

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
            </div>
        </main>
    )
}

export default Perfil
