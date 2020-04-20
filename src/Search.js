import React from 'react';
import axios from 'axios';
import Navigation from './components/Navigation';
import UserInfo from './components/UserInfo';
import Rank from './components/Rank';
import LoadMatchData from './components/LoadMatchData';
import './CSS/Search.css';


const API_DATA = {
  main_url : "https://james--sleep.herokuapp.com/api/",
  api_key : "RGAPI-e0f831f3-34a3-4695-92b6-e2389a5ddcd2"
}

class Search extends React.Component {
  state = {
    userName : "",
    summonerData : [],
    leagueData : [],
    matchList : [],
    isLoading : false
  }
  getData = async () => {
    const summonerData = await axios.get(`${API_DATA.main_url}summoner/${this.state.userName}`);
    const leagueData = await axios.get(`${API_DATA.main_url}league/${summonerData.data.id}`);
    const matchList = await axios.get(`${API_DATA.main_url}matchlist/${summonerData.data.accountId}`);
    this.setState({
      summonerData : summonerData.data,
      leagueData : leagueData.data[0],
      matchList : matchList.data.matches,
      isLoading : true
    });
  }
  getName = (e) => {
    this.setState({
      userName: e.target.value,
    });
  }
  enterPress = (e) => {
    if (e.key === 'Enter') {  this.getData(); }
  }
  render() {
    const { summonerData, leagueData, matchList, isLoading } = this.state;
    return (
      <main>
        <Navigation 
          getData = {this.getData}
          getName = {this.getName}
          enterPress = {this.enterPress}/>
        { isLoading?
          <section>
            <div className="summoner_info">
              <UserInfo 
              iconID = {summonerData.profileIconId}
              summonerName = {summonerData.name}
              level = {summonerData.summonerLevel} />
              <Rank
              tier = {leagueData.tier}
              rank = {leagueData.rank}
              win = {leagueData.wins}
              lose = {leagueData.losses}
              lp = {leagueData.leaguePoints} />
            </div>
            <div className="match_list">
            { 
              matchList.map(matches => (
                <LoadMatchData
                  key = {matches.gameId}
                  id = {matches.gameId}
                  userName = {summonerData.name} />
            ))}
            </div>
          </section>
          : null
        }
      </main>
    );
  }
}

export default Search;