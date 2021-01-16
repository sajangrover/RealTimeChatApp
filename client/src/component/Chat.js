import React, {Component} from 'react'
import queryString from 'query-string'
import socketIOClient from "socket.io-client";
import Message from './Message';
const ENDPOINT = "http://localhost:9000";
let socket;
class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sentMessage: '',
            name: '',
            room: '',
            data : []
        }
    }

    componentDidMount() {
        const user = queryString.parse(this.props.location.search)
        socket = socketIOClient(ENDPOINT);
        this.setState({
            name: user.name,
            room: user.room
        },()=>{})
        socket.emit('join', user);
        socket.on("message", data => {
            this.setState({
                data: [...this.state.data,{
                        receiveMessage : data.message,
                        sender: data.user
                    }]
            })
        });

    }

    handleChange = (e) => {
        this.setState({
            sentMessage : e.target.value
        })
    }
    handleClick = () => {
        socket.emit('sendMessage', this.state.sentMessage);
        this.setState({
            sentMessage : ''
        })
    }
    render(){
        return (
            <div className="outerContainer">
                <div className="innerContainer">
                   
                        <Message info={this.state}></Message>
                    
                    <div className="sendMessageContainer">
                        <input id="message" type="text" onChange ={this.handleChange} value={this.state.sentMessage}/>
                        <button id="send" onClick = {this.handleClick}>send</button>
                    </div>
                </div>
            </div>
        )       
    }
}

export default Chat
