import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Proveedores.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Proveedores = ({ selectedCollection }) => {
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

        const sourceData = data.length > 0 ? data : mockProviders;

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
        navigate('/proveedores/form/new');
    };

    const handleRowClick = (provider) => {
        navigate(`/proveedores/detail/${provider.id}`, { state: { detailData: provider, dataType: 'provider' }});
    };

    const handleEditClick = (provider) => {
        navigate(`/proveedores/form/${provider.id}`, { state: { detailData: provider }});
    };

    const mockProviders = [
        { id: 1, razónSocial: "Triss", email: "triss@gmail.com", teléfono:"123-456-789"},
        { id: 2, razónSocial: "Keira", email: "keira@gmail.com", teléfono:"123-456-789"},
        { id: 3, razónSocial: "Vilgefortz", email: "vilge@gmail.com", teléfono:"123-456-789"},
        { id: 4, razónSocial: "Foltest", email: "foltest@gmail.com", teléfono:"123-456-789"},
        { id: 5, razónSocial: "Bruxa", email: "bruxa@gmail.com", teléfono:"123-456-789"},
        { id: 6, razónSocial: "Ekimmara", email: "eki@gmail.com", teléfono:"123-456-789"},
        { id: 7, razónSocial: "Villentretenmeth", email: "villen@gmail.com", teléfono:"123-456-789"},
        { id: 8, razónSocial: "Ysayle", email: "shiva@gmail.com", teléfono:"123-456-789"},
        { id: 9, razónSocial: "Durendaire", email: "durendaire@gmail.com", teléfono:"123-456-789"},
        { id: 10, razónSocial: "Haillenarte", email: "haillenarte@gmail.com", teléfono:"123-456-789"},
        { id: 11, razónSocial: "Fortemps", email: "fortemps@gmail.com", teléfono:"123-456-789"},
        { id: 12, razónSocial: "Dzemael", email: "dzemael@gmail.com", teléfono:"123-456-789"},
    ]

    const dataToDisplay = data.length > 0 ? data : mockProviders;

    return (
        <div className={styles.proveedoresContainer}>
            <h2>Proveedores</h2>
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
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataToDisplay.map(provider => (
                                <tr 
                                key={provider.id}
                                onClick={() => handleRowClick(provider)}
                                style={{ cursor: 'pointer' }}
                                >
                                    <td>{provider.id}</td>
                                    <td>{provider.razónSocial}</td>
                                    <td>{provider.email}</td>
                                    <td>{provider.teléfono}</td>
                                    <td>
                                        <button
                                            onClick = {(e) => {
                                                e.stopPropagation();
                                                handleEditClick(provider);
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

export default Proveedores;