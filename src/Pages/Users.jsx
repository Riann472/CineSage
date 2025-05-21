import React, { useEffect, useState } from 'react'
import styles from '../../css/pages_css/Users.module.css'
import axios from 'axios'

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/getusers`, { headers: { token: localStorage.getItem('token') } })
            .then(res => {
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(err => console.error('Erro ao buscar usuários:', err))
    }, [])

    return (
        <main className={styles.tableContainer}>
            <h2 className={styles.tableTitle}>Lista de Usuários</h2>
            <table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Categorias</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.user}</td>
                            <td>
                                {Array.isArray(user.categorias) && user.categorias.length > 0
                                    ? user.categorias.map(cat => cat.nome).join(', ')
                                    : "Sem categorias selecionadas"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default Users