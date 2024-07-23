import {Link} from "react-router-dom"
import { useAuth } from "../../state-management/context/AuthContext"
import Navbar from "../navbar/Navbar-notification"

function Header({socket}) {
  const {user,handleLogout}=useAuth()
  //console.log(user)
  return (
    <div >
   
   <nav className="navbar  bg-dark " >
    
      <div className=" col-sm-4 col-md-6 col-lg-8">
          <Link className="navbar-brand mb-0 h3 p-5 text-light " to="/" >Twitter Home</Link>
          
      </div> 
      
      <Navbar socket={socket}/>

      {user && (
  <div>
   
    { user.role === "user" && (
      <>
      <Link className="navbar-brand mb-0 h3 text-light" to="/myprofile">
        My Profile
      </Link>
     
      </>
    )}
    {user.role === "admin" && (
      <Link className="navbar-brand mb-0 h3 text-light" to="/admin-dashboard">
        Admin Dashboard
      </Link>
    )}
  </div>
)}



   


      { !user? (
        <>
        <Link className="navbar-brand mb-0 h3 text-light" to="/login" >Login</Link>
            
        <Link className="navbar-brand mb-0 h3 text-light " to="/registration">Register</Link>
      </>
      ):(
      <>
        {/* <Link className="navbar-brand mb-0 h3" to="/account" >Account</Link> */}
            
        <Link 
        className="navbar-brand mb-0 h3  text-light" 
        to="/" 
        onClick={(e)=>{
          localStorage.removeItem("token")
          handleLogout()
        }}
        >
          Logout
        </Link>
      </>
      )
      }
                
            
      
    </nav>
  

    </div>

  )
}

export default Header

