import { useAuth } from "../../state-management/context/AuthContext"

function Account() {
    const {user}=useAuth()
  return (
    <div style={{textAlign: "center", fontSize: "12px",marginTop: "50px"}}>
        Account
        {user &&(
        <>
            <p>Username-{user.username}</p>
            <p>Email-{user.email}</p>
            <p>Your role-{user.role}</p>
        </>
        )}
    </div>
  )
}

export default Account