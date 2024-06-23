// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:7182/api/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId); // Przechowujemy userId w localStorage
            setIsLoggedIn(true);
            navigate('/dashboard');
        } catch (error) {
            console.error('Logowanie nie powiodło się:', error);
            setError('Logowanie nie powiodło się: ' + error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Logowanie</h2>
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Nazwa użytkownika"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Zaloguj</button>
            </div>
        </div>
    );
}

export default Login;
