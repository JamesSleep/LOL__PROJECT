import React from 'react';
import championData from '../JSON/champion';
import summonerData from '../JSON/summoner';
import runeData from '../JSON/runes';

function MatchSettingInfo({userMatchData}) {
    const championInfo = getPortrait(userMatchData);
    const summonerSpell = getSummonerSpell(userMatchData);
    const runeInfo = getRune(userMatchData);
    return (
        <div className="game_info champion_info">
            <div className="info_imgs">
                <div className="champ_img tooltip">
                    <img
                        src={championInfo.url}
                        alt="champImg"
                    />
                    <span className="tt-text">{championInfo.kr}</span>
                </div>
                <div className="spell_img">
                    <div className="spell1 tooltip">
                        <img 
                            src={summonerSpell.spell1.url}
                            alt="spell1"
                        />
                        <div className="tt-text">
                            <div className="spell_name">{summonerSpell.spell1.name}</div>
                            <span className="spell_description">{summonerSpell.spell1.description}</span>
                        </div>
                    </div>
                    <div className="spell2 tooltip">
                        <img 
                            src={summonerSpell.spell2.url}
                            alt="spell2"
                        />
                        <div className="tt-text">
                            <div className="spell_name">{summonerSpell.spell2.name}</div>
                            <span className="spell_description">{summonerSpell.spell2.description}</span>
                        </div>
                    </div>
                </div>
                <div className="rune_img">
                    <div className="main_rune tooltip">
                        <img 
                            src={runeInfo.mainRune.url}
                            alt="MainRune"
                        />
                        <div className="tt-text">
                            <div className="rune_name">{runeInfo.mainRune.name}</div>
                            <span className="rune_description"
                            dangerouslySetInnerHTML={ {__html: runeInfo.mainRune.longDesc} }>
                            </span>
                        </div>
                    </div>
                    <div className="sub_rune tooltip">
                        <img 
                            src={runeInfo.subRune.url}
                            alt="SubRune"
                        />
                        <div className="tt-text">
                            {runeInfo.subRune.name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="champion_name">
                {championInfo.kr}
            </div>
        </div>
    )
}
function getPortrait(userMatchData) {
    let championInfo = {
        us : "", 
        kr : "",
        url : ""
    }
    for(let i in championData.data) {
        let inner = championData.data[i];
        if(inner["key"] === String(userMatchData.championId)) {
            championInfo.us = inner["id"];
            championInfo.kr = inner["name"];
            championInfo.url = "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/"+championInfo.us+".png";
        }
    }
    return championInfo;
}
function getSummonerSpell(userMatchData) {
    let spell = {
        spell1 : {
            key : userMatchData.spell1Id,
            id : "",
            url : "",
            name : "",
            description : ""
        },
        spell2 : {
            key : userMatchData.spell2Id,
            id : "",
            url : "",
            name : "",
            description : ""
    }}
    for(let i in summonerData.data) {
        if(summonerData.data[i].key === String(spell.spell1.key)) {
            spell.spell1.id = summonerData.data[i].id;
            spell.spell1.name = summonerData.data[i].name;
            spell.spell1.description = summonerData.data[i].description;
            spell.spell1.url = "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/"+spell.spell1.id+".png";
        }
        if(summonerData.data[i].key === String(spell.spell2.key)) {
            spell.spell2.id = summonerData.data[i].id;
            spell.spell2.name = summonerData.data[i].name;
            spell.spell2.description = summonerData.data[i].description;
            spell.spell2.url = "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/spell/"+spell.spell2.id+".png";
        }
    }
    return spell;
}
function getRune(userMatchData) {
    let rune = {
        mainRune : {
            id : userMatchData.stats.perk0,
            icon : "",
            name : "",
            longDesc : "",
            url : ""
        },
        subRune : {
            id : userMatchData.stats.perk4,
            icon : "",
            name : "",
            url : ""
        }
    }
    for(let i=0; i<runeData.length; i++) {
        for(let j=0; j<runeData[i].slots.length; j++) {
            for(let k=0; k<runeData[i].slots[j].runes.length; k++) {
                if(runeData[i].slots[j].runes[k].id === rune.mainRune.id) {
                    rune.mainRune.name = runeData[i].slots[j].runes[k].name;
                    rune.mainRune.icon = runeData[i].slots[j].runes[k].icon;
                    rune.mainRune.longDesc = runeData[i].slots[j].runes[k].longDesc;
                    rune.mainRune.url = "https://ddragon.leagueoflegends.com/cdn/img/"+rune.mainRune.icon;
                }
                if(runeData[i].slots[j].runes[k].id === rune.subRune.id) {
                    rune.subRune.name = runeData[i].name;
                    rune.subRune.icon = runeData[i].icon;
                    rune.subRune.url = "https://ddragon.leagueoflegends.com/cdn/img/"+rune.subRune.icon;
                }
            }
        }
    }
    return rune;
}

export default MatchSettingInfo;