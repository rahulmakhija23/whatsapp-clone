import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from "./StateProvider";
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user }, dispatch] = useStateValue();
  // const [like, setLike] = useState([
  //   {
  //     id: "",
  //     like: false,
  //   },
  // ]);

  const [like, setLike] = useState([
    ...messages,
    {
      messages: messages,
      id: "",
      like: false,
    },
  ]);

  // it will show the current url roomid which we clicked in link of sidebar chat
  // we can have as many useeffect in one component

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          //this is a try method of adding messages like property
          setMessages(
            snapshot.docs.map((doc) => ({
              data: doc.data(),
              id: doc.id,
              like: false, //#1 <----
            }))
          );
        });
      // console.log(messages);
      // console.log("before likes>>>>>>", messages);
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  // console.log("this is  a message stff>>>>>>>>>>>>>>>>>>>>>", messages);
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      like: false,
      //adding the false value by default as there will be no like message
    });

    setInput("");
  };
  useEffect(() => {}, [messages]);
  const countLikes = (id) => {
    // console.log(id)
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .onSnapshot((snapshot) => {
        // console.log(
        snapshot.docs.filter(
          (doc) =>
            // data: doc.data(),
            {
              if (doc.id == id) {
                // console.log("this is id>>>>", id);
                // console.log("this is data>>>>", doc.data());
                // setLike(...like, {
                //   id: id,
                //   like: true,
                // });

                // setLike(...like, [
                //   {
                //     id: id,
                //     like: true,
                //   },
                // ]);
                // #2  <----
                // setMessages(...messages, {
                //   like: true,
                // });
                messages.filter((like) => {
                  if (like.id == id) {
                    // console.log(like);
                    setMessages([...messages], (like.like = !like.like));

                    // firebase update here

                    // #3 this updates thr firebase db
                    db.collection("rooms")
                      .doc(roomId)
                      .collection("messages")
                      // .doc(id)
                      .onSnapshot(
                        snapshot.docs.filter((likeType) => {
                          if (likeType.id == id) {
                            const updatedMessage = likeType.data();
                            // console.log(likeType.data()); //for testing purpose

                            console.log(
                              "this is like before like update >>>",
                              updatedMessage
                            );
                            db.collection("rooms")
                              .doc(roomId)
                              .collection("messages")
                              .doc(id)
                              .update({
                                message: updatedMessage.message,
                                name: updatedMessage.name,
                                timestamp: updatedMessage.timestamp,
                                like: !updatedMessage.like,
                              });

                            console.log(
                              "this is  likes after update>>> ",
                              updatedMessage
                            );
                          }
                        })
                      );
                  }

                  /// db ends
                });
              }
            }
          // id: doc.id,
        );
        // );
      });
  };
  // console.log("after likes >>>>>>", messages);

  // console.log("this is a like", like);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />{" "}
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p className="chat-room-last-seen">
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.data.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.data.name == user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.data.name}</span>
            {message.data.message}{" "}
            <IconButton
              // {like.map(doc)}
              className={message.like ? "chat__likeFill" : ""}
              onClick={(e) => {
                // alert(message.id);
                countLikes(message.id);
              }}
            >
              {message.like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <span className="chat__timestamp">
              {" "}
              {new Date(message.data.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}

        {/* {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name == user.displayName && "chat__receiver"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestemp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))} */}
      </div>
      <div className="chat__footer">
        <EmojiEmotionsIcon />
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}
export default Chat;
