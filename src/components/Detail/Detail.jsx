// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Detail.module.css';

const Detail = () => {
    // const { id } = useParams();
    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     const fetchdata = async () => {
    //         const response = fetch(`https://localhost:8080/api/${selectedCollection}/${id}`);
    //         const result = await response.json();
    //         setData(result);
    //     };

    //     fetchdata()

    // }, [id, selectedCollection]);

    const location = useLocation();
    const data = location.state?.detailData;
    const dataType = location.state?.dataType;

    const navigate = useNavigate();

    const handleBackClick = () => {
        if (dataType === 'client') {
            navigate(`/clientes`);
        } else if (dataType == 'provider') {
            navigate(`/proveedores`); 
        } else {
            navigate(-1); //Fallback
        }
    };

    const handleEditClick = () => {
        if (dataType === 'client') {
            navigate(`/clientes/form/${data.id}`, { state: { detailData: data }});
        } else if (dataType == 'provider') {
            navigate(`/proveedores/form/${data.id}`, { state: { detailData: data }});
        }
    };

    if (!data) {
        return <p>Loading...</p>
    };
    
    return (
        <div className={styles.dataCardContainer}>
            <div className={styles.dataCard}>
                <h2>Datos</h2>
                <p>Título: {data.title}</p>
                <p>Nombre: {data.name}</p>
                <p>Email: {data.email}</p>
                <p>Teléfono: {data.phone}</p>
            </div>
            <div className={styles.btnContainer}> 
                <button 
                    onClick = {handleBackClick}
                    className={styles.backBtn}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <button
                    onClick = {handleEditClick}
                    className={styles.editBtn}
                >
                    <i className="fas fa-edit"></i>
                </button>
            </div>
        </div>
        
    )
    
}

export default Detail;