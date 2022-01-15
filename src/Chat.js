import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GiftIcon from "@material-ui/icons/Gif";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChannelName, selectChannelId } from "./features/appSlice";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setinput] = useState("");
  const [messsages, setmesssages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmesssages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setinput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messsages.map((msg) => (
          <Message
            user={msg.user}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            onClick={sendMessage}
            className="chatinput__button"
            type="submit"
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GiftIcon fontSize="large" />
          <EmojiEmoticonsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
