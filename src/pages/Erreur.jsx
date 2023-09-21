import React from "react"
import {Link} from "react-router-dom"
import "../styles/Erreur404.css"

function Erreur404() {
    return(
        <div className="erreur404">
            <h1 className="erreur404-code">404</h1>
            <h2 className="erreur404-texte">Oups ! La page que vous demandez n'existe pas.</h2>
            <Link to="/" className="erreur404-lien">Retourner sur la page d'accueil</Link>
        </div>
    )
}

export default Erreur404