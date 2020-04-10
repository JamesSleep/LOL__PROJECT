import React from 'react';
import PropTypes from "prop-types";
import '../CSS/Rank.css'

function Rank({tier,rank,win,lose,lp}){
    const rank_img = "/lol__project/img/ranked-emblems/"+tier+".png";
    const title = tier + " " + rank;
    return (
        <div className="rank_info">
            <img 
                src={rank_img}
                alt="tier_img"
                title={title}
            />
            <div className="rank_stats">
                <h3>Solo Rank</h3>
                {
                    tier === "MASTER" || tier === "GRANDMASTER" || tier === "CHALLENGER"
                    ?
                    <h3>{tier}</h3>
                    :<h3>{tier} {rank}</h3>
                }
                <h3>{lp} LP / {win}승 {lose}패</h3>
            </div> 
        </div>
);}

Rank.prototype = {
    tier : PropTypes.string.isRequired,
    rank : PropTypes.string.isRequired,
    win : PropTypes.number.isRequired,
    lose : PropTypes.number.isRequired,
    lp : PropTypes.number.isRequired
}


export default Rank;