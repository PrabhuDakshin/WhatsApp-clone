import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Sidebar.css';
import { IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';


function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue(); 


    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot( snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        ) );

        return () => {
            unsubscribe(); 
        }
    }, [])



    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
              
   
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or Start Chat" type="text" disabled />
                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {
                    rooms.map(room => (
                        <SidebarChat 
                            key={room.id}
                            id={room.id}
                            name={room.data.name}
                        />
                    ))
                }

            </div>
        </div>
    )
}

export default Sidebar
