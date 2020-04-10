import React from "react";
import axios from "axios";

class Test extends React.Component {
    state = {
        userName : "",
        userData : [],
        summonerData : []
    }
    getData = async () => {
        const data = await axios.get('http://localhost:3001/api/summoner/'+this.state.userName);
        this.setState({userData:data.data});
        const summonerData = await axios.get('http://localhost:3001/api/league/'+this.state.userData.id);
        console.log(summonerData);
    }
    getName = (e) => {
        this.setState({
            userName: e.target.value,
        });
    }
    componentDidMount() {
        //this.getData();
    }
    render() {
        const {userData} = this.state;
        return (
            <section>
                <input type="text" onChange={this.getName} />
                <button onClick={this.getData}>검색</button>
                <div>{userData.name}</div>
            </section>
        );
    }
}

export default Test;