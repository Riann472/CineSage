import { useState } from "react";
import axios from "axios";
import styles from "../../css/pages_css/AddCategoria.module.css";

export default function AddCategoria() {
    const [nome, setNome] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            setMensagem("Token não encontrado.");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/addcategoria`,
                { nome },
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                }
            );

            setMensagem("Categoria adicionada com sucesso!");
            setNome("");
        } catch (error) {
            console.error("Erro:", error);
            const erroMsg =
                error.response?.data?.mensagem || "Erro ao adicionar categoria.";
            setMensagem(erroMsg);
        }
    };

    return (
        <main className={styles.cat}>
            <div className={styles.container}>
                <h2 className={styles.title}>Adicionar Categoria</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome da categoria"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button}>
                        Adicionar
                    </button>
                </form>
                {mensagem && <p className={styles.message}>{mensagem}</p>}
            </div>
        </main>
    );
}
