// import { useState } from "react";
import styles from './Aside.module.css';

const Aside = () => {
    // const [recentActivity, setRecentActivity] = useState(null);

    return (
        <aside className={styles.aside}>
            <h2 className={styles.title}>Actividad Reciente</h2>
            <ul className={styles.activityList}>
                <li className={styles.activityItem}>Proveedor #42 agregado</li>
                <li className={styles.activityItem}>Cliente #313 agregado</li>
                <li className={styles.activityItem}>Cliente #312 agregado</li>
                <li className={styles.activityItem}>Factura #642 emitida</li>
                <li className={styles.activityItem}>Mudanza #642 en ruta</li>
                <li className={styles.activityItem}>Factura #640 abonada</li>
                <li className={styles.activityItem}>Proveedor #37 eliminado</li>
            </ul>
        </aside>
    );
};

export default Aside;