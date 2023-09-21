import React from "react"
import BanniereApropos from "../components/BanniereApropos"
import Signup from "../components/Signup"
import Login from "../components/login"

function Apropos(){
    return(
        <div>
            <BanniereApropos/>
            <Signup/>
            <Login/>
        </div>
    )
}

export default Apropos