import { useState } from "react";
import Layout from "./components/Layout/Layout";
import LoginForm from "./components/Login/LoginForm";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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
  };

  return (

    <div>
      <ToastContainer 
        autoClose={3000}
      />
      { isAuthenticated ? <Layout user={user} /> : <LoginForm onLogin={handleLogin} />}
    </div>
      
  );
};

export default App;
