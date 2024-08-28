import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import styles from './Navbar.module.css';

const Navbar = ({ user, onLogout, 
     onSelectCollection 
}) => {
    console.log(user);

    // const navigate = useNavigate();

    const handleSelect = (collection) => {
        onSelectCollection(collection);
    };

    // const handleLogout = () => {
    //     // API call to logout endpoint
    //     fetch('https://localhost:8080/logout', {
    //         method: 'POST',
    //         credentials: 'include' // cookies
    //     })
    //     .then(response => {
    //         if (response.ok) {
    //             navigate('/login');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Error al cerrar sesión:', error)
    //     });

    //     navigate('/login');
    // };

    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbarDark} ${styles.bgDark} ${styles.stickyTop}`}>
            <Link to={"/"} className="navbar-brand">
                <img src="/Exportainer logo.png" alt="logo" className={styles.logo} />
            </Link>
            <button
                className={`navbar-toggler ${styles.navbarToggler}`}
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}></span>
            </button>
            <div className={`collapse navbar-collapse ${styles.collapse}`} id="navbarNav">
                <div className={styles.middleContainer}>
                    <ul className={`navbar-nav mr-auto ${styles.navbarNav}`}>
                        <li className={`nav-item active ${styles.navItem}`}>
                            <Link 
                                className={`nav-link ${styles.navLink}`} 
                                to="/clientes"
                                 onClick={() => handleSelect('users')}
                                >
                                {/* <i className="fas fa-box"></i>  */}
                                Clientes
                            </Link>
                        </li>
                        <li className={`nav-item ${styles.navItem}`}>
                            <Link 
                                className={`nav-link ${styles.navLink}`} 
                                to="/proveedores"
                                onClick={() => handleSelect('products')}
                                >
                                {/* <i className="fas fa-truck"></i>  */}
                                Proveedores
                            </Link>
                        </li>
                        <li className={`nav-item ${styles.navItem}`}>
                            <Link 
                                className={`nav-link ${styles.navLink}`}
                                to="/mudanzas"
                                >
                                {/* <i className="fas fa-shipping-fast"></i>  */}
                                Mudanzas
                            </Link>
                        </li>
                    </ul>
                    {/* <form className={`form-inline my-2 my-lg-0 ${styles.formInline}`}>
                        <input 
                            className={`form-control mr-sm-2 ${styles.formControl}`}
                            type="search" 
                            placeholder="Buscar"
                            aria-label="Search"
                        />
                        <button className={`btn btn-outline-success my-2 my-sm-0 ${styles.btn}`} type="submit">
                            Buscar
                        </button>
                    </form> */}
                </div>
                <ul className={`navbar-nav ml-auto ${styles.navbarNav}`}>
                    <li className={styles.dropdownProfile}>
                        <a 
                            className={`nav-link dropdown-toggle c ${styles.dropdownToggle}`}
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className={`fas fa-user-circle ${styles.profileIcon}`}></i> {user ? user.firstName : 'Perfil'}
                        </a>
                        <div className={`dropdown-menu dropdown-menu-right ${styles.dropdownMenu}`} aria-labelledby="navbarDropdown">
                            <a className={`dropdown-item ${styles.dropdownItem}`} href="#">
                                Pendiente
                            </a>
                            <div className={`dropdown-divider ${styles.dropdownDivider}`}></div>
                            <a 
                            className={`dropdown-item ${styles.dropdownItem}`} 
                            href="#"
                            onClick={onLogout}
                            >
                                Cerrar Sesión
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;