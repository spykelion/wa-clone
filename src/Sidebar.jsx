import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query } from "firebase/firestore";

import { useStateValue } from './StateProvider';

import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material/";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";


import db from "./firebase";

import SidebarChat from './SidebarChat';
import "./sidebar.css";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user },] = useStateValue();


  useEffect(() => {
    try {
      const q = query(collection(db, "rooms"))
      onSnapshot(q, (querySnapshot) => {
        setRooms(querySnapshot.docs.map(doc =>
          ({
              id: doc.id,
              data: doc.data(),
          })))
      });
    } catch (err) {
      console.log(err);
    }
    
    console.log(rooms)
    // unsub()
//    return ()=>unsub()
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        {/* <Avatar /> */}
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
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

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
            </div>
    </div>
  );
}

export default Sidebar;
