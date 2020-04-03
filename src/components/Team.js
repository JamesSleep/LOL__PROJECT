import React from 'react';
import championData from '../JSON/champion';

function Team({championId, summonerName, userChamp}) {
    return (
        <div className="player">
            <div className="player_img tooltip">
                <img 
                src={getPlayer(championId).url}
                alt="player"/>
                <span className="tt-text">{getPlayer(championId).name}</span>
            </div>
            <div className="player_name" title={summonerName}>
                {summonerName}
            </div>
        </div>
    )    
}

function getPlayer(championId) {
    let champ = {
        url : "",
        name : ""
    }
    for (let i in championData.data) {
        let inner = championData.data[i];
        if(inner["key"] === championId) {
            champ.url = "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/"
                +inner["id"]+".png";
            champ.name = inner["name"];
        }
    }
    return champ;
}

export default Team;


