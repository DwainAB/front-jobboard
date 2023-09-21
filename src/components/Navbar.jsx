import React from "react";
import { Link } from "react-router-dom";
import '../styles/Navbar.css';

function Navbar() {
    const isLogged = localStorage.getItem('isLogged') === 'true';

    const handleLogout = () => {
        localStorage.removeItem('isLogged'); // Supprimer le statut de connexion du localStorage
        localStorage.removeItem('authToken'); // Supprimer le token JWT
        localStorage.removeItem('user'); // Supprimer le token JWT
        // Actualiser la page
        window.location.reload();
    };

    return (
        <div className="all">
            <h1 className="navbar-img">TechJob</h1>
            <nav className="navbar-link">
                <Link className="link link-home" to="/">Accueil</Link>
                {
                    isLogged ? (
                        <>
                            <p className="link link-home" onClick={handleLogout}>Déconnexion</p>
                        </>
                    ) : (
                        <Link className="link link-login" to="/log">Connexion</Link>
                    )
                }
            </nav>
        </div>
    )
}

export default Navbar;
