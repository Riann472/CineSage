import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../css/pages_css/Register.module.css'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext'

const Register = () => {
    const navigate = useNavigate()
    const { setAuthState, authState } = useContext(AuthContext)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }, [])

    const [data, setData] = useState({
        user: "",
        password: ""
    })

    return (
        <main className={styles.registerContainer}>
            <form className={styles.register} onSubmit={(e) => {
                e.preventDefault()
                axios.post(`${import.meta.env.VITE_API_URL}/register`, data)
                    .then(res => {
                        if (res.data.error) {
                            alert(res.data.error)
                            console.log(res.data)
                        } else {
                            localStorage.setItem('token', res.data.token)
                            console.log(res.data.user)
                            setAuthState(res.data.user)
                            navigate('/categorias')
                        }
                    })
                    .catch(err => {
                        alert("erro na requisição")
                        console.log(err)
                    })
            }}>
                <h1>Crie sua conta</h1>

                <div>
                    <label htmlFor="username">Nome de usuário</label>
                    <input type="text" id='username' placeholder='Insira seu usuário' onChange={(e) => setData({ ...data, user: e.target.value })} />
                </div>

                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id='password' placeholder='Insira sua senha' onChange={(e) => setData({ ...data, password: e.target.value })} />
                </div>

                <button>Registrar</button>
                <Link to='/login'>Ja tem uma conta? Entre!</Link>
            </form>
        </main>
    )
}

export default Register