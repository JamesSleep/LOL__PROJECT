import React from 'react';
import MatchSettingInfo from './MatchSettingInfo';
import Item from './Item';
import Team from './Team';

function MatchInfo({userMatchData, matchData}) {
    const timestamp = matchData.gameCreation;
    const cs = userMatchData.stats.totalMinionsKilled + userMatchData.stats.neutralMinionsKilled;
    const itemNums = getItemNums(userMatchData);
    const players = getPlayers(matchData);
    return (
        <div className="match_info">
            <div className="game_info game_stats">
                <div className="game_type">솔랭</div>
                <div className="game_date">
                    <span className="tooltip">
                        {getAgoTime(timestamp)}
                        <div className="tt-text">{getGameDate(timestamp)}</div>
                    </span>
                </div>
                <div className="line"></div>
                <div className="gameResult">
                    {userMatchData.stats.win?"승리":"패배"}
                </div>
                <div className="game_time">
                    {parseInt(matchData.gameDuration/60)}분 {(matchData.gameDuration%60)}초
                </div>
            </div>
            <MatchSettingInfo userMatchData={userMatchData}/>
            <div className="game_info game_score">
                <div className="kda">
                    {userMatchData.stats.kills} / {userMatchData.stats.deaths} / {userMatchData.stats.assists}
                </div>
                {   userMatchData.stats.deaths === 0 
                    ?
                    <div className="kda_perfect">PERFECT</div>
                    :
                    <div className="kda_avg">
                    {((userMatchData.stats.kills+userMatchData.stats.assists)/userMatchData.stats.deaths).toFixed(2) + ":1 평점"}
                    </div> 
                }
            </div>
            <div className="game_info game_score2">
                <div>레벨{userMatchData.stats.champLevel}</div>
                <div>{cs} ({(cs/matchData.gameDuration*6).toFixed(1)}) CS</div>
                <div>킬관여{killStock(matchData,userMatchData).toFixed(0)}%</div>
            </div>
            <div className="game_info game_itemList">
                <div className="items">
                    {   itemNums.map((items, index) => (
                        <Item 
                        key={index}
                        itemNum={items}/>    
                    ))}
                </div>
                <div className="wards">제어와드 {userMatchData.stats.visionWardsBoughtInGame}</div>
            </div>
            <div className="game_info game_team">
                <div className="team">
                    {   players.filter((players,index)=>index<5
                        ).map((players,index) => (
                            <Team 
                            key = {index}
                            championId = {players.championId}
                            summonerName = {players.summonerName}
                            userChamp = {userMatchData.championId}/>
                        ))
                    }
                </div>
                <div className="team">
                    {   players.filter((players,index)=>index>=5
                        ).map((players,index) => (
                            <Team 
                            key = {index}
                            championId = {players.championId}
                            summonerName = {players.summonerName}
                            userChamp = {userMatchData.championId}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function getGameDate(timestamp) {
    const date = new Date(timestamp);
    let hour, result, meridiem = "오전 ";
    const year = date.getFullYear();
    const month = date.getMonth(date.setMonth(
        date.getMonth() + 1));
    const day = date.getDate();
    hour = date.getHours();
    const min = date.getMinutes();
    if(hour>11) {meridiem = "오후 ";}
    if(hour>12) {
        date.setHours(date.getHours()-12);
        hour = date.getHours();
    }
    result = year+"년 "+month+"월 "+day+"일 "+meridiem+hour+"시 "+min+"분";
    return result;
}
function getAgoTime(timestamp) {
    const nowDate = new Date();
    const gameDate = new Date(timestamp);
    const difDate = (nowDate-gameDate)/1000;
    let result;
    if (difDate < 3600) {
        result = (difDate/60).toFixed(0)+"분 전";
    } else if (difDate < 86400) {
        result = (difDate/3600).toFixed(0)+"시간 전";
    } else if (difDate < 2678400) {
        result = (difDate/86400).toFixed(0)+"일 전";
    } else {
        result = nowDate.getMonth(
            nowDate.setMonth(
                nowDate.getMonth() - gameDate.getMonth()
            ))+"달 전";
    }
    return result;
}
function killStock(matchData, userMatchData) {
    let trigger = 0;
    if (userMatchData.teamId === 200) {
        trigger = 5;
    }
    let sum=0;
    for(let i=trigger; i<trigger+5; i++) {
        sum += matchData.participants[i].stats.kills;
    }
    return (userMatchData.stats.kills+userMatchData.stats.assists)/sum*100;
}
function getItemNums(userMatchData) {
    let itemNums = new Array();
    for(let i=0; i<3; i++) {
        itemNums[i] = userMatchData.stats["item"+String(i)];
    }
    itemNums[3] = userMatchData.stats["item"+String(6)];
    for(let i=4; i<7; i++) {
        itemNums[i] = userMatchData.stats["item"+String(i-1)];
    }
    return itemNums;
}
function getPlayers(matchData) {
    let players = [];
    for(let i=0; i<10; i++) {
        let championId, summonerName;
        championId = matchData.participants[i].championId;
        summonerName = matchData.participantIdentities[i].player.summonerName;
        players.push({championId:String(championId),summonerName:summonerName})
    }
    return players;
}
export default MatchInfo;