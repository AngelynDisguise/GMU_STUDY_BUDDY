import React from "react";
import '../styles/Match.css'

function Match(name, url){
    return (
        <div className="match">
            <h4>{name}</h4>
            <img src={url}/>
        </div>
    );
}

export default Match;