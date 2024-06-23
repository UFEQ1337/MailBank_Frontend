import React, { useState } from 'react';
import './Transfer.css';

function Transfer() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [recipientStatus, setRecipientStatus] = useState('');

    const checkRecipientStatus = async () => {
        try {
            const userId = parseInt(localStorage.getItem('userId'), 10);
            if (isNaN(userId)) {
                setRecipientStatus('Nieprawidłowy identyfikator użytkownika.');
                return;
            }

            const response = await fetch(`https://localhost:7182/api/transaction/check-email?email=${recipient}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();
            if (response.ok) {
                if (data.userId === userId) {
                    setRecipientStatus('Nie można wykonać przelewu do samego siebie.');
                } else {
                    setRecipientStatus('Konto jest w systemie i można wykonać przelew.');
                }
            } else {
                setRecipientStatus(data.message || 'Odbiorca nie istnieje lub konto nie jest aktywne.');
            }
        } catch (error) {
            console.error('Błąd podczas sprawdzania adresu e-mail:', error);
            setRecipientStatus('Wystąpił problem podczas sprawdzania adresu e-mail.');
        }
    };

    const handleTransfer = async () => {
        try {
            if (!recipient || !amount || !description) {
                setMessage('Proszę wypełnić wszystkie pola.');
                return;
            }

            const userId = parseInt(localStorage.getItem('userId'), 10);
            if (isNaN(userId)) {
                setMessage('Nieprawidłowy identyfikator użytkownika.');
                return;
            }

            // Wykonanie przelewu
            const response = await fetch('https://localhost:7182/api/transaction/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ recipientEmail: recipient, amount: parseFloat(amount), description, userId })
            });

            const data = await response.json();
            if (!response.ok) {
                setMessage(data.message || 'Wystąpił problem podczas wysyłania przelewu.');
                return;
            }

            setMessage('Przelew został wysłany.');
            setRecipient('');
            setAmount('');
            setDescription('');
            setRecipientStatus('');
        } catch (error) {
            console.error('Błąd podczas przesyłania przelewu:', error);
            setMessage('Wystąpił problem podczas wysyłania przelewu.');
        }
    };

    return (
        <div className="transfer-container">
            <h2 className="transfer-title">Przelew</h2>
            {message && <p className="message">{message}</p>}
            <div className="transfer-form">
                <label className="form-label">Odbiorca:</label>
                <input
                    type="email"
                    placeholder="Adres email odbiorcy"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    onBlur={checkRecipientStatus}
                    className="form-input"
                />
                {recipientStatus && <p className="recipient-status">{recipientStatus}</p>}
                <label className="form-label">Kwota:</label>
                <input
                    type="number"
                    placeholder="Kwota w PLN"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input"
                />
                <label className="form-label">Opis przelewu:</label>
                <input
                    type="text"
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-input"
                />
                <button onClick={handleTransfer} className="form-button">Wyślij przelew</button>
            </div>
        </div>
    );
}

export default Transfer;
