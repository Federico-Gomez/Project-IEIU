// import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './MainContent.module.css';

const MainContent = (
    // { selectedCollection }
) => {
    // const [searchTerm, setSearchTerm] = useState("");
    // const [category, setCategory] = useState("");
    // const [data, setData] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

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

    // const handleSearch = () => {
    //     const filteredData = data.filter(item => {
    //         if (category) {
    //             return item[category].toLowerCase().includes(searchTerm.toLowerCase());
    //         }
    //         return Object.values(item).some(val => 
    //             val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //     });
    //     setData(filteredData);
    // };

    // const handleCreateNew = () => {
    //     // Create a new item
    // };

    // return (
    //     <div className={styles.mainContent}>
    //         <h2>{selectedCollection.charAt(0).toUpperCase() + selectedCollection.slice(1)}</h2>
    //         <div className={styles.searchBar}>
    //             <input 
    //                 type="text" 
    //                 placeholder="Search..." 
    //                 value={searchTerm} 
    //                 onChange={(e) => setSearchTerm(e.target.value)} 
    //                 className="form-control"
    //             />
    //             <select
    //                 value={category} 
    //                 onChange={(e) => setCategory(e.target.value)} 
    //                 className={`form-select ${styles.selector}`}
    //             >
    //                 <option value="">Categorías</option>
    //                 {categories.map((cat, idx) => (
    //                     <option key={idx} value={cat}>{cat}</option>
    //                 ))}
    //             </select>
    //             <button 
    //                 className={`btn btn-primary ${styles.searchButton}`}
    //                 onClick={handleSearch}
    //             >
    //                 <i className='fas fa-search'></i>
    //             </button>
    //             <button
    //                 onClick={handleCreateNew}
    //                 className={`btn btn-success ${styles.createButton}`}
    //             >
    //                 Create {selectedCollection ? selectedCollection.slice(0, -1).charAt(0).toUpperCase() + selectedCollection.slice(1, -1) : 'New'}
    //             </button>
    //         </div>

    //         {isLoading ? (
    //             <div className={styles.loadingSpinner}>
    //                 <i className='fas fa-spinner fa-spin'></i> Loading...
    //             </div>
    //         ) : (
    //             <table className={`table table-striped ${styles.table}`}>
    //                 <thead>
    //                     <tr>
    //                         {categories.map((cat, idx) => (
    //                             <th key={idx}>{cat}</th>
    //                         ))}
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {data.map((item, idx) => (
    //                         <tr key={idx}>
    //                             {categories.map((cat, index) => (
    //                                 <td key={index}>{item[cat]}</td>
    //                             ))}
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         )}
    //     </div>
    // );

    const collections = [
        { name: "Clientes", path:"/clientes" },
        { name: "Proveedores", path:"/proveedores" },
        { name: "Mudanzas", path:"/mudanzas" },
    ];

    return (
        <div className={styles.mainContent}>
            <h2>Dashboard</h2>
            <div className="row">
                {collections.map((collection, idx) => (
                    <div key={idx} className="col-sm-4">
                        <div className="card">
                            <div className={styles.cardBody}>
                                <h5 className="card-title">{collection.name.toUpperCase()}</h5>
                                <p>Administrar {collection.name.toLowerCase()}.</p>
                                <Link to={collection.path} className={styles.btn}>Ir a {collection.name}</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MainContent;