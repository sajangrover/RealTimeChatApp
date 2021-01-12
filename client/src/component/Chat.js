import React, {Component} from 'react'
import queryString from 'query-string'
class Chat extends Component {


    componentDidMount() {
        let user = queryString.parse(this.props.location.search)
        console.log(user)
    }
    render(){
        return (
            <div className="outerContainer">
                <div className="innerContainer">
                    <div className="sendMessageContainer">
                        <input id="message" type="text"/>
                        <button id="send">send</button>
                    </div>
                </div>
            </div>
        )       
    }
}

export default Chat
