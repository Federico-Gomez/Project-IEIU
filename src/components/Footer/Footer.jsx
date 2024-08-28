import styles from './Footer.module.css';

const Footer = () => {

        return (
                <footer className={styles.footer}>
                        <div className={styles.footerContent}>
                                <div className={styles.logoContainer}>
                                        <img src='./Login.png' alt="neruSoft Logo" className={styles.logo}/>
                                </div>
                                <div className={styles.text}>
                                        © NeruSoft 2024
                                </div>
                        </div>
                </footer>
        );
};

export default Footer;