import React, { useState } from 'react';
import { apiService } from '../API/apiService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await apiService.login({
                email: email,
                password: password
            });

            if (data.error) {
                setMessage(data.error);
            } else if (data.message === "Connexion réussie") {
                // Affiche le message de réussite
                setMessage(data.message);

                // Stocke le statut de connexion dans le localStorage
                localStorage.setItem('isLogged', 'true');

                // Si le token est présent dans la réponse, stockez-le dans le localStorage
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }

                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user)); // Stockez l'objet en tant que chaîne JSON
                }

                // Redirection vers une page d'accueil après une connexion réussie
                window.location.href = '/';
            }
        } catch (error) {
            // Affiche une erreur en cas de problème avec la demande
            setMessage('Une erreur est survenue lors de la connexion.');
        }
    }

    return (
        <div>
            <h2>Connexion</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <button type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
