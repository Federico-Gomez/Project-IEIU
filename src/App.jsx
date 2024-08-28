import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Layout from './components/Layout/Layout';
import LoginForm from './components/Login/LoginForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    toast.success('Login exitoso!', {
      style: { 
        backgroundColor: 'black', 
        color: 'white',
        fontSize: '16px',
        padding: '10px',
        borderRadius: '5px'
      }
    });

    // Redirect to main page after login
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast.info('Sesión cerrada.', {
      style: {
        backgroundColor: 'black',
        color: 'white',
        fontSize: '16px',
        padding: '10px',
        borderRadius: '5px'
      }
    });
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      { isAuthenticated ? <Layout user={user} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
};

export default App;
