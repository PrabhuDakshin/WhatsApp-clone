import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
function Chat() {

    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue(); 



    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));

            db
                .collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ));
                
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);

        db.collection('rooms').doc(roomId).collection('messages')
            .add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        setInput("");
    }
    
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        last seen{" "}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()
                        } 
                    </p> 
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>   
                </div>

            </div>

            <div className="chat_body">
                {
                    messages.map(msg => (
                        <p className={`chat_message ${msg.name === user.displayName && "chat_reciever"}`}>
                        <span className="chat_name">{msg.name}</span>
                        {msg.message}
                        <span className="chat_timestamp">
                            {new Date(msg.timestamp?.toDate("IST")).toUTCString()}
                        </span>
                        </p>    
                    ))
                }
                
                
            </div>

            <div className='chat_footer'>
                <InsertEmoticonIcon />
                <form>
                    <input 
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type Message Here.."
                    />
                    <button style={{border:"none"}}
                        type="submit"
                        onClick={sendMessage} >
                        <SendIcon />
                    </button>
                    
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
