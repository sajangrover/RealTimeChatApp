import React, { Component } from 'react'

class Message extends Component {
    
    render() {
        return (
            <div className="messageConatiner"> 
            {
                this.props.info.data.map((msg,i) => {
                    if(msg.sender === this.props.info.name){
                        return (<div key={i} className="sender">
                            <p><strong>{msg.sender} : </strong>{msg.receiveMessage}</p>
                        </div>)
                    }
                    else if(msg.sender === 'admin'){
                        return (<div key={i} className="admin">
                            <p>{msg.receiveMessage}</p>
                        </div>)
                    }
                    else{
                        return (<div key={i} className="receiver">
                            <p><strong>{msg.sender} : </strong>{msg.receiveMessage}</p>
                        </div>)
                    }
                })
            }
            </div>
            // <div>
            //     <div className="welcomeConatiner">
            //             {
            //                 this.state.welcomeMsg
            //             }
            //             </div>
            //             <div className="chatContainer">ALl Messages</div>
            // </div>
        )
    }
}

export default Message
