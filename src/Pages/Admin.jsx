import { MdOutlineMovie } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { PiUsersThreeBold } from "react-icons/pi";

import styles from '../../css/pages_css/Admin.module.css'
import ConfigCard from '../components/ConfigCard'

const Admin = () => {

    return (
        <main className={styles.adminContainer}>
            <ConfigCard image={<MdOutlineMovie />} title="Adicionar Filme" path='/' />
            <ConfigCard image={<BiCategory />} title="Adicionar Categoria" />
            <ConfigCard image={<PiUsersThreeBold />} title="Usuários" path='/Users' />
        </main>
    )
}

export default Admin