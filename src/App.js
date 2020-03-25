import React from 'react';
import axios from 'axios';
import State from './State';
import './App.css';

class App extends React.Component {
  state = {
    user_name : "",
    summoner_data: [],
    league_data:[],
    is_search : false
  }
  getUser = (e) => {
    const main_URL = "https://kr.api.riotgames.com/lol/";
    const api_key = "RGAPI-e0f831f3-34a3-4695-92b6-e2389a5ddcd2";
    const user_name = this.state.user_name;
    let user_id;
    axios.get(`${main_URL}summoner/v4/summoners/by-name/${user_name}?api_key=${api_key}`
    ).then(summoner_v4 => {
        
        user_id = summoner_v4.data.id;
        axios.get(`${main_URL}league/v4/entries/by-summoner/${user_id}?api_key=${api_key}`
        ).then(league_v4 => {
          this.setState({
            summoner_data:summoner_v4.data,
            league_data:league_v4.data[0],
            is_search : true
          });
        });
    });
    e.preventDefault();
  }
  getName = (e) => {
    this.setState({
        [e.target.name]:e.target.value
    });
  }
  render() {
    const summonerData = this.state.summoner_data;
    const leagueData = this.state.league_data;
    const isSearch = this.state.is_search;
    return (
      <section>
        <header className ="header">
          <div className="main_title">
            <h1>LOLSEARCH</h1>
          </div>
          <div className="search_bar">
            <form onSubmit={this.getUser}>
                <input 
                    type="text"
                    value={this.state.user_name}
                    name="user_name"
                    onChange={this.getName} />
                <button type="summit">검색</button>
            </form>
          </div>
        </header>
        <div className="summoner_state">
          {
            isSearch?
            <State 
            iconID = {summonerData.profileIconId}
            summonerName = {summonerData.name}
            tier = {leagueData.tier}
            rank = {leagueData.rank}
            win = {leagueData.wins}
            lose = {leagueData.losses}
            lp = {leagueData.leaguePoints} />
            :null
          }
        </div>
      </section>
    );
  }
}

export default App;
