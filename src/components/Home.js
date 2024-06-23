// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="background-animation"></div>
            <div className="home-content">
                <h1>Fullstack</h1>
                <p>To jest pierwsza strona fullstack, która pokazuje kompletną aplikację z frontendem i backendem.</p>
            </div>
        </div>
    );
}

export default Home;
