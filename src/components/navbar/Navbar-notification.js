import "./navbar.css";
import Notification from "../img/notification5.svg";
import Message from "../img/message.svg";
import Settings from "../img/settings.svg";
import { useEffect, useState } from "react";


const Navbar = ({socket}) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    
    //console.log("socket in nav",socket)
    if(socket){
    socket.on("getNotification",(msg)=>{
        console.log(msg)
        setNotifications((prev) => [...prev, msg])
      })
    }
   
  
  }, [socket]);

  const displayNotification = ({ search,totalTweets }) => {
   
    return (
      <span className="notification">{`${search} has ${totalTweets} tweets`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {
            notifications.length > 0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        {/* <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
        </div> */}
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((ele) => displayNotification(ele))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
