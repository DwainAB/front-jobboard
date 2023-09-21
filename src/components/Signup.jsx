import React, { useState } from 'react';
import { apiService } from '../API/apiService';

function Signup() {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const data = await apiService.register({
                company_name: companyName,
                email: email,
                password: password
            });

            if (data.error) {
                setMessage(data.error);
            } else if (data.token) {
                // Stockez le token dans le localStorage (ou le sessionStorage si vous préférez)
                localStorage.setItem('authToken', data.token);

                setMessage(data.message);

                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user)); // Stockez l'objet en tant que chaîne JSON
                }

                window.location.href = '/';

            }
        } catch (error) {
            setMessage('Une erreur est survenue lors de l’inscription.');
        }
    }

    return (
        <div>
            <h2>Inscription</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSignup}>
                <div>
                    <label>Nom de la société:</label>
                    <input 
                        type="text" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)}
                        required 
                    />
                </div>
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
                    <button type="submit">S'inscrire</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
