import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DockSharp, SearchOutlined, Unsubscribe } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
function Sidebar() {
  // const roomCollectionRef = collection(db, "rooms");
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  // console.log("this is a user  >>>>>>>>>>>>>>>", user);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    // const getUsers = async () => {
    //   const q = query(roomCollectionRef);
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     // console.log(doc.id, " >>>>>>>>>>> ", doc.data());
    //     setRooms({ ...doc.data(), id: doc.id, data: doc.data() });
    //   });
    // };
    // getUsers();
    console.log(rooms);
    return () => {
      // this is a clean up function whenever the user unmounts the data
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    console.log("this room is being called for sending messages");
  }, [rooms]);
  // console.log("This is a room>>>>", rooms); to print out the
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        {/* <Avatar src="https://i0.wp.com/www.cssscript.com/wp-content/uploads/2020/12/Customizable-SVG-Avatar-Generator-In-JavaScript-Avataaars.js.png?fit=438%2C408&ssl=1" /> */}
        <div className="sidebar__headerRight">
          <IconButton>
            {/* icon button helps to make the icon clickable */}
            <DonutLargeIcon />
          </IconButton>
          {/*  */}
          {/* <div onClick={alert("this is chat icon button")}> */}
          <IconButton
            onClick={() => {
              alert("heyyy");
            }}
          >
            <ChatIcon />
          </IconButton>
          {/* </div> */}
          {/*  */}
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat" />
        </div>
      </div>
      {/* <div className="sidebar__addnewHeader">
        <h2>ADD New Chat</h2>
      </div> */}

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={room.data.name}
            rooms={rooms}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
