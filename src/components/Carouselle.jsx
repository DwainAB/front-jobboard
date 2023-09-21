import React, { useState } from "react"
import Data from "../Data.js"
import leftArrow from "../assets/flechegauche.png"
import rightArrow from "../assets/flechedroit.png"
import "../styles/Carroussel.css"
import { useParams } from "react-router-dom"


function Carroussel(){
    const [index, setIndex] = useState(0)
    const {id} = useParams() //récupération de l'id de l'url
    const searchObject = Data.find((element) => element.id === id) //Recherche de l'objet qui à le même id que celui de l'url dans le fichier json Data
    const idData = Data.map((data) => (data.id)) //récupère les id de Data
    
    if (idData.includes(id))  { //vérifie si l'id est présent dans idData
    const pictureData = searchObject.pictures //Récupération des images dans une variable
        
    //Fonction qui permet d'aller à l'image suivante
    function NextSlide(){
        setIndex(index + 1) //incrémente la valeur de index de 1
        if(index === pictureData.length - 1){ //vérfie si on a atteint la fin du tableau
            setIndex(0) //si c'est le cas revien à l'index 0
        }
    }

    //Fonction qui permet d'aller à l'image précédente
    function prevSlide(){
        setIndex(index - 1)
        if(index ===0){
            setIndex(pictureData.length - 1)
        }
    }

    return(
        
        <div className="carrousselbox"> 
          <img className="imagecarroussel" src={pictureData[index]} alt="" />     
            {pictureData.length > 1 && (
                <div className="carrousselnav">
                  <img onClick={prevSlide} className="fleche" src={leftArrow} alt="" />
                  <img onClick={NextSlide} className="fleche" src={rightArrow} alt="" />
                </div>
            )}
        </div>
    )
  }
}

export default Carroussel