import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import styles from './Presupuesto.module.css'

const Presupuesto = () => {
    const { id}  = useParams();
    const [quote, setQuote] = useState(null);

    const location = useLocation();
    const data = location.state?.detailData;

    const navigate = useNavigate();

    useEffect(() => {
        const quotes = JSON.parse(localStorage.getItem('quotes')) || [];
        const selectedQuote = quotes.find((quote) => quote.id === id);
        setQuote(selectedQuote);
    }, [id]);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Presupuesto para ${quote.clientName}`, 10, 10);
        doc.text(`Fecha: ${quote.date}`, 10, 20);
        doc.text(`Subtotal: ${quote.totalAmount}`, 10, 30);

        doc.text(`Items:`, 10, 40);
        quote.items.forEach((item, index) => {
            doc.text(`${item.description} - ${item.quantity} @ $${item.price}`, 10, 50 + (index * 10));
        });

        doc.save(`presupuesto_${quote.clientName}_${quote.date}.pdf`);
    };

    const handleBackClick = () => {   
        navigate(-1); //Fallback
    };

    const handleEditClick = () => {
        navigate(`/presupuestos/form/${data.id}`, { state: { detailData: data }});
    }

    if (!quote) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.quoteContainer}>
            <h2 className={styles.quoteTitle}>Presupuesto para {quote.clientName}</h2>
            <div className={styles.quoteBody}>
                <p className={styles.quoteDate}>Fecha: {quote.date}</p>
                <p className={styles.quoteTotal}>Subtotal: {quote.totalAmount}</p>
                <h3 className={styles.itemsTitle}>Items:</h3>
                <ul className={styles.itemsList}>
                    {quote.items.map((item, index) => (
                        <li key={index} className={styles.item}>
                            <span className={styles.itemDescription}>{item.description}</span>
                            <span className={styles.itemQuantity}>Cantidad: {item.quantity}</span>
                            <span className={styles.itemPrice}>Precio: ${item.price}</span>
                        </li>
                    ))}
                </ul>

                <button onClick={generatePDF} className={styles.pdfButton}>Generar PDF</button>
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
    );
};

export default Presupuesto;