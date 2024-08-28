import { useEffect, useState } from 'react';
import styles from './ClientForm.module.css';
import { useLocation } from 'react-router-dom';

const ClientForm = ({ onSubmit }) => {
    const location = useLocation();
    const clientData = location.state?.detailData;

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        país: '',
        dirección: '',
        teléfono: '',
        email: ''
    });

    useEffect(() => {
        if (clientData) {
            setFormData(clientData);
        }
    }, [clientData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }
    
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{clientData ? 'Actualización de datos' : 'Registro de nuevo Cliente'}</h2>
            <div className={styles.formContent}>
                <div className={styles.formGroup}>
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="apellido">Apellido</label>
                    <input 
                        type="text" 
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="país">País</label>
                    <input 
                        type="text" 
                        id="país"
                        name="país"
                        value={formData.país}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="dirección">Dirección</label>
                    <input 
                        type="text" 
                        id="dirección"
                        name="dirección"
                        value={formData.dirección}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="teléfono">Teléfono</label>
                    <input 
                        type="tel" 
                        id="teléfono"
                        name="teléfono"
                        value={formData.teléfono}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <button type='submit' className={styles.submitBtn}>
                {clientData ? 'Actualizar' : 'Registrar Cliente'}
            </button>
        </form>
    )
    
}

export default ClientForm;