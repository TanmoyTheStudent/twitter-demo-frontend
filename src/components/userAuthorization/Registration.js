import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Registration() {
    const navigate=useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [username,setUsername] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState('') 

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        const FormData={
            username,
            email,
            password
        }
        try{
        const response= await axios.post('http://localhost:3033/api/users/register',FormData)
        
          console.log(response)

            alert('successfully registered in')
            setServerErrors("")
          setEmail('')
          setPassword("")
          setUsername("")
          navigate("/login")
          //  props.loginSuccess() //
        }catch(err){
            console.log(err)
            setServerErrors(err.response.data.errors)
        }
    }

  return (
    <div className="col-md-6 offset-md-3 " style={{marginTop: '100px'}}>
        
        <h4 className="text-center">Register Here</h4>
        <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="username"
                    >User name</label>
                    <input 
                        type="text" 
                        value={username} 
                         onChange={(e)=>{setUsername(e.target.value)}} 
                        name="username" 
                        className="form-control"
                        id="username"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="email"    
                    >Email</label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        name="email" 
                        id="email"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label
                        className="form-label"
                        htmlFor="password"
                    >Password</label>
                    <input 
                        type="password" 
                         value={password} 
                        onChange={(e)=>{setPassword(e.target.value)}} 
                        name="password" 
                        id="password"
                        className="form-control"
                    />
                </div>
                <br/>

                
                {
                serverErrors.length > 0 &&  (
                    <div style={{color:"red"}}>
                        These errors prohibited the form from being saved: 
                        <ul>
                            { serverErrors.map((ele, i) => {
                                return <li key={i}> { ele.msg }</li>
                            })}
                        </ul>
                    </div>
                )
            }
                <br/>

                <input type="submit" className="btn btn-primary" />
            </form>
            
    </div>
  )
}

export default Registration

