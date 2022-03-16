import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

import db from './firebase';
import './SidebarChat.css';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);
    const roomCollectionRef = collection(db, "rooms");

    useEffect(()=>{
        const getMessagesDocs = async () => {
            try {
              const mq = query(collection(db, "rooms", id, "messages"))
              onSnapshot(mq, (querySnapshot) => {
                    setMessages(querySnapshot.docs.map(doc => doc.data()))
                    console.log("FROM SIDEBAR - chat => /-trim/",querySnapshot.docs.map(doc =>
                        ({
                            id: doc.id,
                            data: doc.data(),
                        })))
                });
      
            } catch (error) {
            //   console.error(error);
            }
          };
          getMessagesDocs()
    },[id])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = async() => {
        const roomName = prompt("Please enter name for chat");
       
        if (roomName) {
            await addDoc(roomCollectionRef, {name: roomName})
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.body}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
             <IconButton>
            <AddIcon />
          </IconButton>
        </div>
    )
}

export default SidebarChat;