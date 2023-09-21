import React from "react"
import {Link} from "react-router-dom"
import "../styles/Footer.css"

function Footer(){
    return(
        <div className="footer">
            <Link to="/">
            <h1 className="navbar-img">TechJob</h1>
            </Link>
            <p className="text-footer">© 2023 TechJob. Tous droits réservés</p>
        </div>
    )
}

export default Footer