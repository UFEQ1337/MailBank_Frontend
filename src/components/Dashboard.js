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
            .then(user => {
                setUserId(user.id);
                localStorage.setItem('userId', user.id);
            })
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
                <div className="widget account-summary-widget">
                    <h3>Podsumowanie konta</h3>
                    {user ? (
                        <div className="widget-content">
                            <p><strong>Imię:</strong> {user.firstName}</p>
                            <p><strong>Nazwisko:</strong> {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Ostatnie logowanie:</strong> {new Date(user.lastLogin).toLocaleString()}</p>
                            <p><strong>Status konta:</strong> {translateStatus(user.status)}</p>
                        </div>
                    ) : (
                        <p>Brak danych użytkownika</p>
                    )}
                </div>
                <div className="widget bank-account-widget">
                    <div className="widget-content">
                        <p className="balance">{bankAccount.balance.toFixed(2)} PLN</p>
                    </div>
                </div>
                <div className="widget transactions-widget">
                    <h3>Ostatnie transakcje</h3>
                    {transactions && transactions.$values && transactions.$values.length > 0 ? (
                        <div className="widget-content transactions-list">
                            {transactions.$values.slice(0, 10).map(transaction => (
                                <div key={transaction.id} className="transaction">
                                    <div className={`transaction-type ${transaction.type.toLowerCase()}`}>
                                        <span className="material-symbols-outlined">
                                            {transaction.type === "Outgoing" ? "arrow_outward" : "call_received"}
                                        </span>
                                        {translateTransactionType(transaction.type)}
                                    </div>
                                    <div className="transaction-details">
                                        <p><strong>Kwota:</strong> {transaction.amount.toFixed(2)} PLN</p>
                                        <p><strong>Data:</strong> {new Date(transaction.date).toLocaleString()}</p>
                                        {transaction.type === "Outgoing" && (
                                            <p><strong>Odbiorca:</strong> {transaction.recipientEmail || 'Nieznany'}</p>
                                        )}
                                        {transaction.type === "Incoming" && (
                                            <p><strong>Nadawca:</strong> {transaction.recipientEmail || 'Nieznany'}</p>
                                        )}
                                        <p><strong>Opis:</strong> {transaction.description}</p>
                                    </div>
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

    function translateTransactionType(type) {
        switch (type) {
            case "Incoming":
                return "Przychodząca";
            case "Outgoing":
                return "Wychodząca";
            default:
                return type;
        }
    }
}

export default Dashboard;
