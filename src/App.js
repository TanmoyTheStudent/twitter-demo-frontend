import axios from "axios";
import { Route,Routes,useNavigate } from "react-router-dom";
import { useState,useEffect } from 'react' 
import { useDispatch,useSelector } from 'react-redux'
import { getTweetsRequest } from "./state-management/actions/tweets-action-saga"
import { io } from "socket.io-client";

//useAuth to store user after login
import { useAuth } from "./state-management/context/AuthContext";


//importing components
import Header from "./components/home/Header";
import Home from "./components/home/Home";
import Registration from "./components/userAuthorization/Registration";
import Login from "./components/userAuthorization/Login";
import Account from "./components/userAuthorization/Account";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./components/Unauthorized";
import MyProfile from "./components/home/MyProfile";

function App() {
  const [socket, setSocket] = useState(null);

  
  const navigate=useNavigate()
  //getting all tweets
    const dispatch = useDispatch()
      
    //dispatch(startGetOffices())
  
    useEffect(() => {
        dispatch(getTweetsRequest(1))
        console.log("dispatched")
      }, [dispatch])
  
    const tweets = useSelector((state) => {
        return state.tweets.allTweets
     })

   const totalTweets=useSelector((state)=>{
        return state.tweets.totalTweets
   })  
    
  
  //setting the user in useAuth() during re-loading
  const {handleLogin}=useAuth()
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      (async()=>{
        try{
        const response = await axios.get('http://localhost:3033/api/users/account', {
                   headers:{
                      Authorization:localStorage.getItem('token')
                    }
                })
        handleLogin(response.data)
        console.log("users set at useEffect in App.js ",response.data)
      }catch(error){
        if (error.response && error.response.data.error === "jwt expired") {
          console.log("Token expired for user account request.",error);
          localStorage.removeItem('token');
          // Redirect to login or show a message
          navigate("/login")
        } else {
          console.log("An error occurred while fetching user account:", error);
        }
      }
  
      }
    )();  
    }
  },[])

  // useEffect(() => {
  //   setSocket(io("http://localhost:5000"));
  // }, []);

  useEffect(() => {
    setSocket(io("http://localhost:3033"))
    console.log("socket value",socket)
    if(socket){
    socket.on("firstEvent",(msg)=>{
      console.log(msg)
    })
  }
  }, []);

  useEffect(() => {
   if(socket){
    socket.on("firstEvent",(msg)=>{
      console.log(msg)
    })
    socket.on("getNotification",(msg)=>{
      console.log("msg",msg)
    })
   }
  }, [socket]);

  return (
    <div>
      <Header socket={socket}/>
      <Routes>
          <Route path="/" element={<Home tweets={tweets} socket={socket} totalTweets={totalTweets}/>} />
          <Route path="/login" element={<Login />}/>
        <Route path="/registration" element={<Registration />} />
        <Route path="/account" element={<PrivateRoute permittedRoles={['admin','user']}>
                                          <Account/>
                                        </PrivateRoute>}/>
        <Route path="/myprofile" element={<PrivateRoute permittedRoles={['user']}>
                                          <MyProfile/>
                                        </PrivateRoute>}/>
        
      </Routes>
    </div>
  );
}

export default App;
