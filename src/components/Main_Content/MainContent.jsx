import styles from './MainContent.module.css';

const MainContent = () => {
    return (
        <main className={styles.mainContent}>
            <div className={styles.sectionContent}>
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Clientes</h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.sectionText}>Listado de Clientes</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Mudanzas</h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.sectionText}>Listado de Mudanzas</p>
                    </div>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Proveedores</h2>
                    <div className={styles.sectionContent}>
                        <p className={styles.sectionText}>Listado de Proveedores</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainContent;