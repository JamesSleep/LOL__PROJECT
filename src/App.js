import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    user_data : []
  }
  getUser = () => {
    const api_key = "RGAPI-85f78151-b164-4ed5-95a5-a3f2d15b4f8e";
    const user_name = "hideonbush";
    axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user_name}?api_key=${api_key}`
    ).then(data => {
      this.setState({user_data:data.data});
    });
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    const data = this.state.user_data;
    console.log(data);
    return (
      <section>
        <form onSubmit={this.search}>
          <input type="text" />
          <button type="summit">검색</button>
        </form>
        <h1>{data.name}</h1>
        <h2>{data.id}</h2>
      </section>
    );
  }
}

export default App;
