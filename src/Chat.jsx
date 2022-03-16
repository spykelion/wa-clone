import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined, AttachFile, MoreVert } from "@mui/icons-material/";
import { InsertEmoticon, Mic } from "@mui/icons-material/";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, orderBy, query,onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";


import { useStateValue } from "./StateProvider";
import db from "./firebase";
import "./Chat.css";

function Chat() {
  const [{ user }] = useStateValue();
//   const user = {displayName: "username", photoUrl: "/path/h"}
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState({ name: "" });
  const [messages, setMessages] = useState([
    { body: "first", user: "lionel", id: "1" },
  ]);

  useEffect(() => {
    const getRoomDocs = async (id) => {
      try {
        const singleRoom = doc(db, "rooms", id);
        const mydoc = await getDoc(singleRoom);
        const mq = query(collection(db, "rooms", roomId, "messages"))
        onSnapshot(mq, (querySnapshot) => {
            console.log(querySnapshot.docs.map(doc =>
              ({
                  id: doc.id,
                  data: doc.data(),
              })))
          });
        
        setRoomName({ name: mydoc.data().name });
      } catch (err) {
        console.log(err);
      }
    };


    const getMessagesDocs = async () => {
      try {
        // get a message query
        const mq = query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp", "asc"))
        onSnapshot(mq, (querySnapshot) => {
            /* console.log(querySnapshot.docs.map(doc =>
              ({
                  id: doc.id,
                  data: doc.data(),
              }))) */
              setMessages(querySnapshot.docs.map(doc => doc.data()))
          });

      } catch (error) {
        console.error(error);
      }
    };

    getRoomDocs(roomId);
    getMessagesDocs();
    // return () => getRoomDocs();
  }, [roomId]);

  


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("user input", input);
    console.log(roomId);

    try {
        const messageCollectionRef = collection(db, "rooms", roomId, "messages")
        await addDoc(messageCollectionRef, {user: user.displayName, body: input, timestamp: serverTimestamp()})
    } catch (error) {
      console.error(error);
    }
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName.name}</h3>
          <p>last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages?.map((message) => (
          <p
            key={message.id}
            className={`chat__message ${
              message.user === user.displayName && "chat__receiver"
            }`}
          >
            {/* <p className="chat__message" key={message.id}>  */}
            <span className="chat__name">{message.user}</span>
            {message.body}
            <span className="chat__timestamp">{new Date(message?.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
