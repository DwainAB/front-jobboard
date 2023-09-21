import "../styles/Collapse.css"
import { useState } from "react"

function Collapse(){

    const [isOpen, setIsOpen] = useState(false) //l'état local de isOpen est initialisé à "false"

    const toggleSection = (open) => { //fonction appelée lorsque l'utilisateur clique sur l'élément collapse pour l'ouvrir ou le fermer, elle prend en paramètre open
    if (isOpen === open) { //si isOpen est déjà a open 
          setIsOpen(false); //retourne false et ferme
        } else {
          setIsOpen(open); //sinon retourne true et ouvre 
        }
      };

    const collapseProps = (open) =>{ //la fonction collapseProps retourne un objet avec deux propriété
        return {
        isOpen: isOpen === open, 
        toggle: () => toggleSection(open),
      }
    }

      return {collapseProps}
}

export default Collapse