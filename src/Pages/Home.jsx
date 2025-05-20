import styles from './Home.module.css'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Home = () => {
    return (
        <main>
            <form>
                <div>
                    <input type="text" placeholder='Pesquise um filme' />
                    <button><FaMagnifyingGlass /></button>
                </div>
            </form>

        </main>
    )
}

export default Home