import React from 'react'
import Banniere from '../components/BanniereAccueil'
import Carte from '../components/Carte'

function Accueil(){

    const userInfo = JSON.parse(localStorage.getItem('user'));

    return(
        <div>
            <Banniere/>
            {userInfo && (
                <h1 style={{ color: 'red', textAlign: 'center' }}>
                    Bonjour {userInfo.company_name}
                </h1>
            )}
            <Carte/>
        </div>
    )
}

export default Accueil;
