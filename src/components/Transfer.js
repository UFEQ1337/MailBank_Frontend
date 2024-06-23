// src/components/Transfer.js
import React, { useState } from 'react';
import './Transfer.css';

function Transfer() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleTransfer = async () => {
        // Placeholder for transfer logic
        setMessage('Przelew został wysłany.');
    };

    return (
        <div className="transfer-container">
            <h2>Przelew</h2>
            {message && <p className="message">{message}</p>}
            <div className="transfer-form">
                <input
                    type="text"
                    placeholder="Odbiorca"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Kwota"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleTransfer}>Wyślij przelew</button>
            </div>
        </div>
    );
}

export default Transfer;
