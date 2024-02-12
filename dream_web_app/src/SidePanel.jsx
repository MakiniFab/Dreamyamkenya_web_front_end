import React, { useState } from 'react';
import './index.css';

function SidePanel() {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
    <>
        <div className={`side-panel ${isOpen ? 'open' : ''}`}>
            <div className="menu-items">
                <ul>
                    <li>Vision</li>
                    <li>Contact us</li>
                    <li>Experts</li>
                </ul>
            </div>
        </div>
        <button onClick={togglePanel} className="toggle-button">MENU</button>
        </>
    );
}

export default SidePanel;
