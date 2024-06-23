// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
    const [data, setData] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch current user to get userId
        fetch('https://localhost:7182/api/user/me', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(user => setUserId(user.id))
            .catch(error => console.error('Error fetching current user:', error));
    }, []);

    useEffect(() => {
        if (userId) {
            fetch(`https://localhost:7182/api/Dashboard/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching dashboard data:', error));
        }
    }, [userId]);

    if (!data) {
        return <div className="dashboard-container">Loading...</div>;
    }

    const { user, bankAccount, transactions } = data;

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="dashboard-widgets">
                <div className="widget">
                    <h3>Podsumowanie konta</h3>
                    {user ? (
                        <div className="widget-content">
                            <p><strong>Imię:</strong> {user.firstName}</p>
                            <p><strong>Nazwisko:</strong> {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Ostatnie logowanie:</strong> {new Date(user.lastLogin).toLocaleDateString()}</p>
                            <p><strong>Status konta:</strong> {translateStatus(user.status)}</p>
                        </div>
                    ) : (
                        <p>Brak danych użytkownika</p>
                    )}
                </div>
                <div className="widget bank-account-widget">
                    <h3>Stan konta bankowego</h3>
                    {bankAccount ? (
                        <div className="widget-content">
                            <p className="balance">{bankAccount.balance.toFixed(2)} PLN</p>
                        </div>
                    ) : (
                        <p>Brak danych konta bankowego</p>
                    )}
                </div>
                <div className="widget">
                    <h3>Ostatnie transakcje</h3>
                    {transactions && transactions.length > 0 ? (
                        <div className="widget-content">
                            {transactions.map(transaction => (
                                <div key={transaction.id} className="transaction">
                                    <p><strong>Typ:</strong> {transaction.type}</p>
                                    <p><strong>Kwota:</strong> {transaction.amount.toFixed(2)} PLN</p>
                                    <p><strong>Data:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Brak transakcji</p>
                    )}
                </div>
            </div>
        </div>
    );

    function translateStatus(status) {
        switch (status) {
            case "Active":
                return "Aktywne";
            case "Inactive":
                return "Nieaktywne";
            default:
                return status;
        }
    }
}

export default Dashboard;
