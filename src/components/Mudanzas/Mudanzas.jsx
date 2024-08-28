import { Link } from 'react-router-dom';
import styles from './Mudanzas.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Mudanzas = () => {

        return (
                <div className={styles.mudanzasContainer}>
                <h2>Gestión de Mudanzas</h2>
                <div className={styles.cardContainer}>
                        <div className={styles.card}>
                                <h3>Presupuestos</h3>
                                <Link to="/presupuestos" className={styles.btn}>Ver Presupuestos</Link>
                        </div>
                        <div className={styles.card}>
                                <h3>Seguimiento</h3>
                                <Link to="/seguimiento" className={styles.btn}>Seguimiento de Mudanzas</Link>
                        </div>
                        <div className={styles.card}>
                                <h3>Cargar Presupuesto</h3>
                                <Link to="/presupuestos/form/new" className={styles.btn}>Nuevo Presupuesto</Link>
                        </div>
                        <div className={styles.card}>
                                <h3>Aduana</h3>
                                <Link to="/aduana" className={styles.btn}>Información de Aduana</Link>
                        </div>
                </div>

        </div>
        )

};

export default Mudanzas;