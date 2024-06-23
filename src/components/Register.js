// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch('https://localhost:7182/api/Auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, firstName, lastName, email })
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors).flatMap(messages => messages);
                    setError('Błąd walidacji: ' + errorMessages.join(', '));
                } else {
                    setError('Błąd podczas rejestracji: ' + data.title);
                }
                return;
            }

            navigate('/login');
        } catch (error) {
            console.error('Rejestracja nie powiodła się:', error);
            setError('Rejestracja nie powiodła się: ' + error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Rejestracja</h2>
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
                <input
                    type="text"
                    placeholder="Imię"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nazwisko"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleRegister}>Zarejestruj się</button>
            </div>
        </div>
    );
}

export default Register;
