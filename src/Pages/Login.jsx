import styles from './Login.module.css'

const Login = () => {
    return (
        <main className={styles.loginContainer}>
            <form className={styles.login}>
                <h1>Crie sua conta</h1>

                <div>
                    <label htmlFor="username">Nome de usuário</label>
                    <input type="text" id='username' placeholder='Insira seu usuário' />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' placeholder='Insira seu email' />
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id='password' placeholder='Insira sua senha' />
                </div>

                <button>Registrar</button>
            </form>
        </main>
    )
}

export default Login