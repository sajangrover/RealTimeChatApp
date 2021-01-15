import React ,{Component} from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios';
class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName : "",
            room : "",
            loggedIn: false
        }
    }
    handleChane = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    joinChat = () => {
        if (this.state.userName.length && this.state.room.length){
            axios.post('http://localhost:9000/user' , this.state).then(res => {
                console.log(res);
                this.setState({
                    loggedIn: true
                },() => {});
            }).catch(err => {
                alert(`User Name ${this.state.userName} already exist`)
            })
        }
    }
    render(){
        if (this.state.loggedIn) {
            const {userName, room} = this.state;
            return <Redirect to = {`/chat?name=${userName}&room=${room}`} />;
        }
        return (
            <div>
                <div>
                    <input id="userName" type="text" placeholder="Enter User Name" onChange={this.handleChane}/>
                    <input id="room" type="text" placeholder="Enter Rooom Name" onChange={this.handleChane}/>
                    <button onClick={this.joinChat}>JOIN</button>
                </div>
            </div>
        )
    }
}

export default Home
