import React from 'react';
import image0 from './assets/images.jpeg';
import image2 from './assets/images (2).jpeg';
import image3 from './assets/images (3).jpeg';

function Logos() {
    return (
        <div className="logos-container">
            <div className="logo-wrapper">
                <img src={image0} alt="Logo 1" className="logo" />
                <span className="logo-text">Dream Ya Mkenya Co.</span>
            </div>
            <span className="separator">|</span>
            <div className="logo-wrapper">
                <img src={image2} alt="Logo 2" className="logo" />
                <span className="logo-text">Dream Software Developers</span>
            </div>
            <span className="separator">|</span>
            <div className="logo-wrapper">
                <img src={image3} alt="Logo 3" className="logo" />
                <span className="logo-text">Dream Gamers Ke.</span>
            </div>
        </div>
    );
}

export default Logos;

