import { useState, useEffect } from 'react';
import styles from './ProviderForm.module.css';
import { useLocation } from 'react-router-dom';

const ProviderForm = ({ onSubmit }) => {
    const location = useLocation();
    const providerData = location.state?.detailData;

    const [formData, setFormData] = useState({
        razónSocial: '',
        país: '',
        dirección: '',
        teléfono: '',
        email: ''
    });

    useEffect(() => {
        if (providerData) {
            setFormData(providerData);
        }
    }, [providerData]);

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
            <h2>{providerData ? 'Actualización de datos' : 'Registro de nuevo Proveedor'}</h2>
            <div className={styles.formContent}> 
                <div className={styles.formGroup}>
                    <label htmlFor="razónSocial">Razón Social</label>
                    <input 
                        type="text" 
                        id="razónSocial"
                        name="razónSocial"
                        value={formData.razónSocial}
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
                {providerData ? 'Actualizar' : 'Registrar Proveedor'}
            </button>
        </form>
    )
    
}

export default ProviderForm;