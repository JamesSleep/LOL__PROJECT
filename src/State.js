import React from 'react';
import PropTypes from "prop-types";

function State({
    iconID,summonerName,tier,rank,
    win,lose,lp
}){
    const proflie = "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/"+iconID+".png";
    return (
        <div className="summoner">
            <img src={proflie} alt="profileIcon" title="profileIcon"/>
            <h3>{summonerName}</h3>
            <h3>{tier}</h3>
            <h3>{rank}</h3>
            <h3>{win}</h3>
            <h3>{lose}</h3>
            <h3>{lp}</h3>
        </div>
);}

State.prototype = {
    iconID : PropTypes.number.isRequired,
    summonerName : PropTypes.string.isRequired,
    tier : PropTypes.string.isRequired,
    rank : PropTypes.string.isRequired
}


export default State;