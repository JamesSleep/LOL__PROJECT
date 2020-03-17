import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    user_data : [],
    user_name : ""
  }
  getUser = (e) => {
    const api_key = "RGAPI-e2b0f447-a3f2-4d41-b9f0-8afae8fd0d07";
    const user_name = this.state.user_name;
    axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user_name}?api_key=${api_key}`
    ).then(data => {
      this.setState({user_data:data.data});
    });
    e.preventDefault();
  }
  getName = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  componentDidMount() {}
  render() {
    const data = this.state.user_data;
    return (
      <section>
        <form onSubmit={this.getUser}>
          <input 
            type="text" 
            value={this.state.user_name}
            name="user_name"
            onChange={this.getName} />
          <button type="summit">검색</button>
          <h1>{data.name}</h1>
          <h2>{data.accountId}</h2>
        </form>
      </section>
    );
  }
}

export default App;
