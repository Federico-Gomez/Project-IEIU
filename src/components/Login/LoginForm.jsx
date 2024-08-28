import { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/sessions/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            console.log(response);

            if (response.ok) {
                const data = await response.json();
                onLogin(data.user);
                console.log(data.user);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid credentials');
            }
            
        } catch (error) {
            console.error('Login failed', error);
            setError('An unexpected error occurred, please try again.');
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.loginFormContainer}>
                <img src="/Login.png" alt="loginLogo" className={styles.loginLogo} />
                
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.formControl}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.formControl}
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button type='submit' className={styles.submitButton}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default LoginForm;