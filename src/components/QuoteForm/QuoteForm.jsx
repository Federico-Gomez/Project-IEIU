import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './QuoteForm.module.css';

const QuoteForm = ({ onQuoteCreated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const quoteData = location.state?.detailData;

    const [formData, setFormData] = useState({
        clientName: '',
        date: '',
        items: [],
        totalAmount: ''
    });

    const [item, setItem] = useState({
        description: '',
        quantity: 1,
        price: ''
    });

    useEffect(() => {
        if (quoteData) {
            setFormData(quoteData);
        }
    }, [quoteData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value});
    };

    const addItem = () => {
        setFormData({
            ...formData,
            items: [...formData.items, item]
        });
        setItem({ description: '', quantity: 1, price: ''});
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const existingQuotes = JSON.parse(localStorage.getItem('quotes')) || [];

        const newQuote = { ...formData, id: Date.now().toString() };
        existingQuotes.push(newQuote);
        localStorage.setItem('quotes', JSON.stringify(existingQuotes));

        if (onQuoteCreated) {
            onQuoteCreated(newQuote.id);
        }

        navigate(`/presupuesto/${newQuote.id}`);
        
    };
    
    return (
        <form onSubmit={handleSubmit} className={styles.quoteForm}>
            <h2>Nuevo Presupuesto</h2>
            <div className={styles.formGroup}>
                <label htmlFor="clientName">Nombre del Cliente:</label>
                <input 
                    type="text" 
                    name='clientName'
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="date">Fecha:</label>
                <input 
                    type="date" 
                    name='date'
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="totalAmount">Subtotal:</label>
                <input 
                    type="number" 
                    name='totalAmount'
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="items">Items:</label>
                <div className={styles.itemInput}>
                    <input 
                        type="text" 
                        name='description'
                        placeholder='Descripción'
                        value={item.description}
                        onChange={handleItemChange}
                    />
                    <input 
                        type="number" 
                        name='quantity'
                        placeholder='Cantidad'
                        value={item.quantity}
                        onChange={handleItemChange}
                        min='1'
                    />
                    <input 
                        type="number" 
                        name='price'
                        placeholder='Precio'
                        value={item.price}
                        onChange={handleItemChange}
                        min='0'
                    />
                    <button type='button' onClick={addItem}>Agregar Item</button>
                </div>
            </div>

            <ul className={styles.addedItems}>
                {formData.items.map((item, index) => (
                    <li key={index} className={styles.addedItemDetail}>
                        {item.description} - {item.quantity} @ ${item.price}
                    </li>
                ))}
            </ul>

            <button type='submit' className={styles.createBtn}>Crear Presupuesto</button>
        </form>
    );
    
};

export default QuoteForm;