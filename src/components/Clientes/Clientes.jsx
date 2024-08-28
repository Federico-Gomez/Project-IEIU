import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Clientes.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Clientes = ({ selectedCollection }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedCollection) {
            setIsLoading(true);
            fetch(`http://localhost:8080/api/${selectedCollection}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setCategories(Object.keys(data[0] || {}));
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error recuperando datos:', error);
                    setIsLoading(false);
                });
        }
    }, [selectedCollection]);

    const handleSearch = () => {

        const sourceData = data.length > 0 ? data : mockClients;

        const filteredData = sourceData.filter(item => {
            if (category) {
                return item[category].toLowerCase().includes(searchTerm.toLowerCase());
            }
            return Object.values(item).some(val => 
                val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        setData(filteredData);
    };

    const handleCreateNew = () => {
        navigate('/clientes/form/new');
    };

    const handleRowClick = (client) => {
        navigate(`/clientes/detail/${client.id}`, { state: { detailData: client, dataType: 'client' }});
    };

    const handleEditClick = (client) => {
        navigate(`/clientes/form/${client.id}`, { state: { detailData: client }});
    }

    const mockClients = [
        { id: 1, nombre: "Pepito", email: "pepito@gmail.com", teléfono:"123-456-789"},
        { id: 2, nombre: "Pepita", email: "pepita@gmail.com", teléfono:"123-456-789"},
        { id: 3, nombre: "Carlos", email: "charles@gmail.com", teléfono:"123-456-789"},
        { id: 4, nombre: "Yenifer", email: "yen@gmail.com", teléfono:"123-456-789"},
        { id: 5, nombre: "Enrique", email: "henry@gmail.com", teléfono:"123-456-789"},
        { id: 6, nombre: "Hildegard", email: "hilde@gmail.com", teléfono:"123-456-789"},
        { id: 7, nombre: "Hildibrand", email: "hildi@gmail.com", teléfono:"123-456-789"},
        { id: 8, nombre: "Nashu", email: "nashu@gmail.com", teléfono:"123-456-789"},
        { id: 9, nombre: "Nerevar", email: "nerevar@gmail.com", teléfono:"123-456-789"},
        { id: 10, nombre: "Penelope", email: "penelope@gmail.com", teléfono:"123-456-789"},
        { id: 11, nombre: "Almalexia", email: "almalexia@gmail.com", teléfono:"123-456-789"},
        { id: 12, nombre: "Ganso", email: "ganso@gmail.com", teléfono:"123-456-789"},
    ]

    const dataToDisplay = data.length > 0 ? data : mockClients;

    return (
        <div className={styles.clientesContainer}>
            <h2>Clientes</h2>
            <div className={styles.searchBar}>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="form-control"
                />
                <select
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    className={`form-select ${styles.selector}`}
                >
                    <option value="">Categorías</option>
                    {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))}
                </select>
                <button 
                    className={`btn btn-primary ${styles.searchButton}`}
                    onClick={handleSearch}
                >
                    <i className='fas fa-search'></i>
                </button>
                <button
                    className={`btn btn-success ${styles.createButton}`}
                    onClick={handleCreateNew}
                >
                    +
                </button>
            </div>

            {isLoading ? (
                <div className={styles.loadingSpinner}>
                    <i className='fas fa-spinner fa-spin'></i> Loading...
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataToDisplay.map(client => (
                                <tr 
                                key={client.id}
                                onClick={() => handleRowClick(client)}
                                style={{ cursor: 'pointer' }}
                                >
                                    <td>{client.id}</td>
                                    <td>{client.nombre}</td>
                                    <td>{client.email}</td>
                                    <td>{client.teléfono}</td>
                                    <td>
                                        <button
                                            onClick = {(e) => {
                                                e.stopPropagation();
                                                handleEditClick(client);
                                            }}
                                            className={styles.editBtn}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                </div>
             )} 
        </div>
    )    
};

export default Clientes;