import React from "react"
import imgBanniere from '../assets/banniere.png'
import '../styles/Banniere.css'

function Banniere (){
    return(
        <div className="full-banniere">
            <img className="img-banniere" src={imgBanniere} alt="Banniere" />
            <div className="shadow-banniere"></div> 
            <h2 className="titre-banniere">Trouvez le job qui vous correspond</h2>
        </div>
    )
}

export default Banniere

//la div vide permet d'assombrir la bannière
