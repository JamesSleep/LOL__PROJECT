import React from 'react';
import axios from 'axios';
import MatchInfo from './MatchInfo';
import '../CSS/Match.css';

const API_DATA = {
    main_url : "https://kr.api.riotgames.com/lol/",
    api_key : "RGAPI-e0f831f3-34a3-4695-92b6-e2389a5ddcd2"
  }

class LoadMatchData extends React.Component {
    state = {
        gameId : this.props.id,
        userName : this.props.userName,
        matchData : [],
        userMatchData : [],
        isLoading : false
    }
    getData = async () => {
        const {userName, gameId} = this.state;
        let userMatchData = [];
        const matchData = await axios.get(`${API_DATA.main_url}match/v4/matches/${gameId}?api_key=${API_DATA.api_key}`);
        for(let i in matchData.data.participantIdentities) {
            if(matchData.data.participantIdentities[i].player.summonerName === userName) {
                userMatchData = matchData.data.participants[i];
            }
        }
        this.setState({
            matchData:matchData.data,
            userMatchData: userMatchData,
            isLoading : true
        });
    }
    componentDidMount() {
        this.getData();
    }
    render() {
        const {userMatchData, matchData, isLoading} = this.state;
        return (
            <div className="match_block">
                {isLoading
                ?
                    userMatchData.stats.win
                    ?
                    <div className="match_win">
                        <MatchInfo
                        userMatchData = {userMatchData}
                        matchData = {matchData}/>
                    </div>
                    :
                    <div className="match_lose">
                        <MatchInfo
                        userMatchData = {userMatchData}
                        matchData = {matchData}/>
                    </div>
                :null}
            </div>
        )
    }
}

export default LoadMatchData;