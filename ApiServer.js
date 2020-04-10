const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 5000;
const request = require('request');
const urlencode = require('urlencode');
const api_key = "RGAPI-e0f831f3-34a3-4695-92b6-e2389a5ddcd2";
const main_url = "https://kr.api.riotgames.com/lol/";

app.use(cors());
app.use(bodyParser.json());

app.use('/api/summoner/:name', (req, res)=> {
    const userName = urlencode(req.params.name);
    const url = `${main_url}summoner/v4/summoners/by-name/${userName}?api_key=${api_key}`;
    request(url,function(error,response,body){
        res.json(JSON.parse(body));
    });
});
app.use('/api/league/:summonerId', (req, res)=> {
    const summonerId = urlencode(req.params.summonerId);
    const url = `${main_url}league/v4/entries/by-summoner/${summonerId}?api_key=${api_key}`;
    request(url,function(error,response,body){
        res.json(JSON.parse(body));
    });
});
app.use('/api/matchlist/:accountId',(req,res)=> {
    const accountId = urlencode(req.params.accountId);
    const url = `${main_url}match/v4/matchlists/by-account/${accountId}?queue=420&endIndex=10&beginIndex=0&api_key=${api_key}`;
    request(url,function(error,response,body){
        res.json(JSON.parse(body));
    });
});
app.use('/api/matches:gameId',(req,res)=> {
    const gameId = urlencode(req.params.gameId);
    const url = `${main_url}match/v4/matches/${gameId}?api_key=${api_key}`;
    request(url,function(error,response,body){
        res.json(JSON.parse(body));
    });
});

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})