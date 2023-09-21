import React from "react"
import {Link} from "react-router-dom"
import LogoFooter from "../assets/logoFooter.png"
import "../styles/Footer.css"

function Footer(){
    return(
        <div className="footer">
            <Link to="/">
                <img src={LogoFooter} alt="Logo Kasa" />
            </Link>
            <p className="text-footer">© 2021 Kasa. Tous droits réservés</p>
        </div>
    )
}

export default Footer