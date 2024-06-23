// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <h1>Witamy w MailBank</h1>
            <p>MailBank to nowoczesna aplikacja bankowa umożliwiająca szybkie i bezpieczne przesyłanie pieniędzy na adres email.</p>
            <p>Funkcje:</p>
            <ul>
                <li>Szybkie przelewy na adres email</li>
                <li>Bezpieczne logowanie i autoryzacja</li>
                <li>Podgląd salda konta i historii transakcji</li>
            </ul>
            <p>Dołącz do nas już dziś i przekonaj się, jakie to proste!</p>
        </div>
    );
}

export default Home;
