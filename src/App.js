// src/App.js
import React, { useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Transfer from './components/Transfer';
import Home from './components/Home';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="logo">MailBank</div>
                <nav>
                    <ul>
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link to="/dashboard">
                                        <button>Dashboard</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/transfer">
                                        <button>Przelew</button>
                                    </Link>
                                </li>
                                <li>
                                    <button className="logout-button" onClick={handleLogout}>
                                        Wyloguj
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                        <button>Logowanie</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register">
                                        <button>Rejestracja</button>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                {isLoggedIn && <Route path="/dashboard" element={<Dashboard />} />}
                {isLoggedIn && <Route path="/transfer" element={<Transfer />} />}
            </Routes>
        </div>
    );
}

export default App;
