import React, {Component} from 'react'
import queryString from 'query-string'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:9000";
let socket;
class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message : ''
        }
    }

    componentDidMount() {
        let user = queryString.parse(this.props.location.search)
        console.log(user)
        socket = socketIOClient(ENDPOINT);

        socket.emit('join', user, (welcome) => {
            console.log(welcome)
        });
        socket.on("message", data => {
            console.log(data);
        });

    }

    handleChange = (e) => {
        this.setState({
            message : e.target.value
        })
    }
    handleClick = () => {
        socket.emit('sendMessage', this.state.message);
        this.setState({
            message : ''
        })
    }
    render(){
        return (
            <div className="outerContainer">
                <div className="innerContainer">
                    <div className="sendMessageContainer">
                        <input id="message" type="text" onChange ={this.handleChange} value={this.state.message}/>
                        <button id="send" onClick = {this.handleClick}>send</button>
                    </div>
                </div>
            </div>
        )       
    }
}

export default Chat
