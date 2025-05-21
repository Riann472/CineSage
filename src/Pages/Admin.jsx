import { MdOutlineMovie } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { PiUsersThreeBold } from "react-icons/pi";
import { useContext, useEffect } from "react";
import { AuthContext } from "../helpers/AuthContext";
import styles from '../../css/pages_css/Admin.module.css'
import ConfigCard from '../components/ConfigCard'
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate()
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        if (authState.cargo != 'admin') navigate('/home')
    }, [])

    return (
        <main className={styles.adminContainer}>
            <ConfigCard image={<MdOutlineMovie />} title="Adicionar Filme" path='/addfilme' />
            <ConfigCard image={<BiCategory />} title="Adicionar Categoria" path='/addcategoria' />
            <ConfigCard image={<PiUsersThreeBold />} title="Usuários" path='/users' />
        </main>
    )
}

export default Admin