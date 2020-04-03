import React from 'react';
import PropTypes from "prop-types";
import '../CSS/UserInfo.css'

function UserInfo({iconID,summonerName,level}){
    const proflie = "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/profileicon/"+iconID+".png";
    return (
        <div className="summoner_proflie">
            <img
                className ="proflie_icon"
                src={proflie} alt="profileIcon" 
                title="profileIcon"/>
            <div className="proflie_info">
                <h1>{summonerName}</h1>
                <h3>LEVEL : {level}</h3>
            </div>
        </div>
);}

UserInfo.prototype = {
    iconID : PropTypes.number.isRequired,
    summonerName : PropTypes.string.isRequired,
    tier : PropTypes.string.isRequired,
    rank : PropTypes.string.isRequired
}


export default UserInfo;