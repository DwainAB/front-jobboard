import React from "react";
import Data from "../Data";
import "../styles/LogementDetail.css"
import Vector from "../assets/vector.png"
import StarImgGrey from "../assets/grey_star.png"
import StarImgRed from "../assets/red-star.svg"
import Erreur404 from "../pages/Erreur";
import { useParams } from "react-router-dom";
import Collapse from "./FonctionCollapse";


function PageLogement(){
    const {collapseProps} = Collapse() //ajout de la fonction collapse
    const {id} = useParams() //récupération de l'id depuis l'url
    const searchObject = Data.find((element) => element.id === id) //Recherche de l'objet qui à le même id que celui de l'url dans le fichier json Data
    
    if (searchObject == null)  { //si aucun objet est trouvé renvois à la page d'erreur
        return <Erreur404 />
    }
    
    const hostName = searchObject.host.name //récupération du Nom de l'hôte dans une variable
    const hostPicture = searchObject.host.picture //récupération de l'image de l'hôte dans une variable

        return(
            <div>
                
                <div className="boxLogement">
                    <div className="informationLogement">
                        <h2 className="titreLogement">{searchObject.title}</h2> 
                        <p className="localisationLogement">{searchObject.location}</p>
                        <ul className="listeTag">
                            {searchObject.tags.map((data) => (
                                <li key={data} className="tag">{data}</li>
                            ))}
                        </ul>
                    </div>
    
                    <div className="hote">
                        <div className="hoteIdentite">
                        <p className="hoteNom">{hostName}</p>
                        <img className="hoteImage" src={hostPicture} alt="" />
                        </div>
                        <div className="hoteStar">
                            {
                                [...Array(5).keys()].map((k) => {
                                    
                                    if(parseInt(searchObject.rating) > k  )
                                        return <img key={k} src={StarImgRed} alt="" />
                                    return <img key={k} src={StarImgGrey} alt="" />
                                })
                            }
                       </div>
                    </div>
                </div>
    
                <div>
                    <div className="wrapper-accordeon">
                        <div className="accordeon">
                            <div className="item-accordeon">                     
                                        <div className="titre-item-accor" onClick={collapseProps(searchObject.description).toggle}>
                                            <h2>Description</h2>
                                            <img className={collapseProps(searchObject.description).isOpen ? 'active' : 'noactive'} src={Vector} alt="fleche" />
                                        </div>                                  
                                    <div className={collapseProps(searchObject.description).isOpen ? 'contenue-item-show-accor' : 'contenue-item-accor'}><p>{searchObject.description}</p></div>                    
                                </div>    
                        </div>
    
                        <div className="accordeon">
                            <div className="item-accordeon">                     
                                        <div className="titre-item-accor" onClick={collapseProps(searchObject.equipments).toggle}>
                                            <h2>Equipement</h2>
                                            <img className={collapseProps(searchObject.equipments).isOpen ? 'active' : 'noactive'} src={Vector} alt="fleche" />
                                        </div>                                  
                                    <div className={collapseProps(searchObject.equipments).isOpen ? 'contenue-item-show-accor' : 'contenue-item-accor'}>
                                    {searchObject.equipments.map((id) => (
                                      <p key={id}>{id}</p>
                                    ))}
                                    </div>                    
                                </div>    
                        </div>       
                    </div>
                </div>
            </div>     
        )
     }   
   

    

export default PageLogement