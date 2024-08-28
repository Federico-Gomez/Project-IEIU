import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Presupuestos.module.css';
import "bootstrap/dist/css/bootstrap.min.css";

const mockQuotes = [
    { id: 1, clientName: "Pepito", date: "11-11-2011", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 2, clientName: "Pepita", date: "25-05-2023", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 3, clientName: "Carlos", date: "22-02-2019", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 4, clientName: "Yenifer", date: "17-06-2017", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 5, clientName: "Enrique", date: "30-11-1998", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 6, clientName: "Hildegard", date: "08-10-2023", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 7, clientName: "Hildibrand", date: "22-08-2011", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 8, clientName: "Nashu", date: "21-11-2020", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 9, clientName: "Nerevar", date: "04-11-2003", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 10, clientName: "Penelope", date: "30-03-1996", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 11, clientName: "Almalexia", date: "03-12-2024", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
    { id: 12, clientName: "Ganso", date: "01-10-2010", totalAmount: 10000, items: ['Cama', 'Heladera', 'Mesa', 'Silla', 'Silla' ]},
]

const Presupuestos = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [data, setData] = useState([]);
    // const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const quotesFromStorage = JSON.parse(localStorage.getItem('quotes')) || [];
        const combinedData = [...mockQuotes, ...quotesFromStorage];
        console.log(combinedData);
        setData(combinedData);
        setIsLoading(false);
    }, []);

    // useEffect(() => {
    //     if (selectedCollection) {
    //         setIsLoading(true);
    //         fetch(`http://localhost:8080/api/${selectedCollection}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 setData(data);
    //                 setCategories(Object.keys(data[0] || {}));
    //                 setIsLoading(false);
    //             })
    //             .catch(error => {
    //                 console.error('Error recuperando datos:', error);
    //                 setIsLoading(false);
    //             });
    //     }
    // }, [selectedCollection]);

    const handleSearch = () => {
        const quotes = [...mockQuotes, ...JSON.parse(localStorage.getItem('quotes')) || []];
        const filteredData = quotes.filter(item => {
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
        navigate('/presupuestos/form/new');
    };

    const handleRowClick = (quote) => {
        navigate(`/presupuesto//${quote.id}`, { state: { detailData: quote }});
    };

    const handleEditClick = (quote) => {
        navigate(`/presupuestos/form/${quote.id}`, { state: { detailData: quote }});
    };

    return (
        <div className={styles.presupuestosContainer}>
            <h2>Presupuestos</h2>
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
                    {/* {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                    ))} */}
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
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Subtotal</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(quote => (
                                <tr 
                                    key={quote.id}
                                    onClick={() => handleRowClick(quote)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{quote.id}</td>
                                    <td>{quote.clientName}</td>
                                    <td>{quote.date}</td>
                                    <td>{quote.totalAmount}</td>
                                    <td>
                                        <button
                                            onClick = {(e) => {
                                                e.stopPropagation();
                                                handleEditClick(quote);
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

export default Presupuestos;