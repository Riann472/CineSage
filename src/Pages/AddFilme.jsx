import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import styles from '../../css/pages_css/AddFilme.module.css'
import { AuthContext } from '../helpers/AuthContext'

const AddFilme = () => {
    const { authState } = useContext(AuthContext)
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [imagemUrl, setImagemUrl] = useState('')
    const [categorias, setCategorias] = useState([])
    const [selecionadas, setSelecionadas] = useState([])
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/getcategorias`)
            .then(res => setCategorias(res.data || []))
            .catch(err => console.error('Erro ao buscar categorias:', err))
    }, [])

    const toggleCategoria = (id) => {
        setSelecionadas(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        )
    }

    const handleSubmit = () => {
        const token = localStorage.getItem('token')
        if (!nome || !descricao || !imagemUrl || selecionadas.length === 0) {
            return setMensagem('Preencha todos os campos e selecione pelo menos uma categoria.')
        }

        axios.post(`${import.meta.env.VITE_API_URL}/addfilme`, {
            nome,
            descricao,
            img: imagemUrl, // <- aqui está a mudança
            categoriaIds: selecionadas
        }, {
            headers: { token }
        })
            .then(res => {
                if (!res.data.error) {
                    setMensagem('Filme adicionado com sucesso!')
                    setNome('')
                    setDescricao('')
                    setImagemUrl('')
                    setSelecionadas([])
                } else {
                    setMensagem('Erro: ' + res.data.error)
                }
            })
            .catch(err => {
                console.error('Erro ao adicionar filme:', err)
                setMensagem('Erro ao adicionar filme.')
            })
    }

    return (
        <main className={styles.filme}>
            <div className={styles.container}>
                <h1 className={styles.title}>Adicionar Novo Filme</h1>

                <input
                    type="text"
                    placeholder="Nome do filme"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className={styles.input}
                />
                <textarea
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="URL da imagem"
                    value={imagemUrl}
                    onChange={e => setImagemUrl(e.target.value)}
                    className={styles.input}
                />

                <h3 style={{ marginBottom: '0.5rem' }}>Categorias:</h3>
                <div className={styles.grid}>
                    {categorias.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.cat} ${selecionadas.includes(cat.id) ? styles.selected : ''}`}
                            onClick={() => toggleCategoria(cat.id)}
                            type="button"
                        >
                            {cat.nome}
                        </button>
                    ))}
                </div>

                <button className={styles.button} onClick={handleSubmit}>
                    Adicionar Filme
                </button>

                {mensagem && <p className={styles.message}>{mensagem}</p>}
            </div>
        </main>
    )
}

export default AddFilme
