import React from "react";
import "./Header.styles.css";

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <img
                    src="../../../public/logo/Bike Company LOGO.png"
                    alt="Logo"
                />
            </div>
            <div className="background-image">
                <img src="../../../public/images/header/mosaic.jpg" />
            </div>
        </header>
    );
};
