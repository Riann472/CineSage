import { useEffect, useState } from 'react'
import styles from './Login.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
    const navigate = useNavigate()
    const { authState, setAuthState } = useContext(AuthContext)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [])

    // estados que serão enviados pra requisição
    const [data, setData] = useState({
        user: "",
        password: ""
    })

    return (
        <main className={styles.loginContainer}>
            <form className={styles.login} onSubmit={(e) => {
                e.preventDefault()
                axios.post(`${import.meta.env.VITE_API_URL}/login`, data)
                    .then(res => {
                        if (res.data.error) {
                            alert(res.data.error)
                        } else {
                            localStorage.setItem('token', res.data.token)
                            setAuthState(res.data.user)
                            navigate('/home')
                        }
                    })
            }}>
                <h1>Entrar</h1>

                <div>
                    <label htmlFor="username">Nome de usuário</label>
                    <input type="text" id='username' placeholder='Insira seu usuário' onChange={(e) => setData({ ...data, user: e.target.value })} />
                </div>

                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id='password' placeholder='Insira sua senha' onChange={(e) => setData({ ...data, password: e.target.value })} />
                </div>

                <button>Registrar</button>
                <Link to='/'>Ainda não tem conta? Clique aqui!</Link>

            </form>
        </main>)
}

export default Login