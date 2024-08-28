import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import MainContent from '../Main_Content/MainContent';
import Clientes from '../Clientes/Clientes';
import ClientForm from '../ClientForrm/ClientForm';
import Proveedores from '../Proveedores/Proveedores';
import ProviderForm from '../ProviderForm/ProviderForm';
import Mudanzas from '../Mudanzas/Mudanzas';
import QuoteForm from '../QuoteForm/QuoteForm';
import Presupuestos from '../Presupuestos/Presupuestos';
import Presupuesto from '../Presupuesto/Presupuesto';
import Detail from '../Detail/Detail';
import styles from './Layout.module.css';
import Footer from '../Footer/Footer';

const Layout = ({ user, onLogout }) => {
    const [selectedCollection, setSelectedCollection] = useState('');
    const location = useLocation();

    return (
        <div className={styles.layoutContainer}>
            <Navbar user={user} onLogout={onLogout} onSelectCollection={setSelectedCollection} />
            <div className={styles.mainContainer}>
                <Routes location={location}>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/clientes" element={<Clientes selectedCollection={selectedCollection} />} />
                    <Route path="/clientes/detail/:id" element={<Detail />} />
                    <Route path="/clientes/form/new" element={<ClientForm />} />
                    <Route path="/clientes/form/:id" element={<ClientForm />} />
                    <Route path="/proveedores" element={<Proveedores selectedCollection={selectedCollection} />} />
                    <Route path="/proveedores/detail/:id" element={<Detail />} />
                    <Route path="/proveedores/form/new" element={<ProviderForm />} />
                    <Route path="/proveedores/form/:id" element={<ProviderForm />} />
                    <Route path="/mudanzas" element={<Mudanzas />} />
                    <Route path="/presupuestos" element={<Presupuestos />} />
                    <Route path="/presupuestos/detail/:id" element={<Detail />} />
                    <Route path="/presupuestos/form/new" element={<QuoteForm />} />
                    <Route path="/presupuestos/form/:id" element={<QuoteForm />} />
                    <Route path="/presupuesto/:id" element={<Presupuesto />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;

