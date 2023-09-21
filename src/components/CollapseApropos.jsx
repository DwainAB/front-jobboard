import React from "react"
import DataApropos from "../DataApropos"
import Collapse from "./FonctionCollapse"
import Vector from "../assets/vector.png"

function CollapseApropos(){
    const {collapseProps} = Collapse()
    return(
        <div className="full-collapse">
        {DataApropos.map((item, index) => (
          
                <div className="wrapper" key={index}>
                    <div className="accordeon">
                        <div className="item">                     
                            <div className="titre-item" onClick={collapseProps(index).toggle}> {/*Lors du clique le l'élément déclanche la fonction collapseProps qui active l'effet de toggle*/}
                                <h2>{item.title}</h2>
                                <img className={collapseProps(index).isOpen ? 'active' : 'noactive'} src={Vector} alt="fleche" />
                            </div>                                  
                            <div className={collapseProps(index).isOpen ? 'contenue-item-show' : 'contenue-item'}><p>{item.content}</p></div>                    
                        </div>        
                    </div>
                </div>
            

        ))}
    </div>
    )

    
   
       

}
            
export default CollapseApropos