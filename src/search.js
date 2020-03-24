import React from 'react';
import axios from 'axios';

const main_URL = "https://kr.api.riotgames.com/lol/";
const api_key = "RGAPI-e0f831f3-34a3-4695-92b6-e2389a5ddcd2";
let summoner_data = [];

function Summoner({name}) {
    /*
    let user_name = name;
    axios.get(`${main_URL}summoner/v4/summoners/by-name/${user_name}?api_key=${api_key}`
    ).then(search_data => {
        summoner_data = search_data.data;
    });
    
    return <div>{summoner_data.profileIconId}</div>
    */
   return <h1>{name}</h1>
}

function League(id,league_data) {
    const user_id = id;
    axios.get(`${main_URL}league/v4/entries/by-summoner/${user_id}?api_key=${api_key}`
    ).then(search_data => {
        league_data = search_data.data[0];
    });
    return league_data;
}

export {Summoner, League};


