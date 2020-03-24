import React from 'react';
import axios from 'axios';
import {Summoner, League} from './search';

class App extends React.Component {
  state = {
    summoner_data : [],
    league_data : [],
    user_name : "",
    is_search : false
  }
  getUser = (e) => {
    /*
    const user_name = this.state.user_name;
    const main_URL = "https://kr.api.riotgames.com/lol/";
    const api_key = "RGAPI-e0f831f3-34a3-4695-92b6-e2389a5ddcd2";
    axios.get(`${main_URL}summoner/v4/summoners/by-name/${user_name}?api_key=${api_key}`
    ).then(search_data => {
        this.setState({
          summoner_data:search_data.data,
          is_search:true
        });
    });
    */
    this.setState({is_search:true});
    e.preventDefault();
  }
  getName = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    });
    
  }
  render() {
    const data = this.state.summoner_data;
    const is_search = this.state.is_search;
    const name = this.setState.user_name;
    return (
      <section>
        <form onSubmit={this.getUser}>
          <input 
            type="text" 
            value={this.state.user_name}
            name="user_name"
            onChange={this.getName} />
          <button type="summit">검색</button>
        </form>
        <div>
          {is_search
            ?
            <Summoner name={name}/>
            :
            <h1>nothing</h1>
          }
        </div>
      </section>
    );
  }
}

export default App;
