import { useState,useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
 
import { createTweetRequest,updateTweetRequest  } from "../../state-management/actions/tweets-action-saga"
//import OfficeList from "./OfficeList"
//import { useAuth } from "../../state-management/context/AuthContext"


function TweetForm(props) {
   
     // const {profile}=useAuth()
    //console.log(props)
    const dispatch = useDispatch()
    const serverErrors = useSelector((state) => {
        return state.tweets.serverErrors
     })

   // console.log("serverErrors",serverErrors)

    const{myTweets,editId,toggle}=props
    const tweet=myTweets?myTweets.find(ele=>ele._id===editId) : null

//console.log("office in officeForm",office)

//Setting form info
    const [form, setForm] = useState(!tweet?{
        text:"",
        image:null
    }:{
        text: tweet.text,
        image: tweet.image
    })

   // console.log(form)
  

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "text"){
            setForm({...form, [name]: value })
        }else{
            setForm({...form,[name]:e.target.files[0]})
        }
       
        //console.log(form)
        //console.log(e)
    }

    //using es7-async await
    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log("form",form)

        const resetForm = () => {
            setForm({ 
                text: '',
                image:null
            })
        }

        
        if(tweet){
            dispatch(updateTweetRequest(editId,form, resetForm,toggle)) 
           
        }else{
            dispatch(createTweetRequest(form, resetForm)) 
            
        }
         
          
        

        // try{
        // const response= await axios.post('http://localhost:3033/api/offices/create',form,{
        //     headers:{
        //         Authorization:localStorage.getItem('token')}
        //     })
        
        //   console.log(response)
        //     alert('successfully registered in')
           
        //   //  props.loginSuccess() //
        // }catch(err){
        //     console.log(err)
        //     //setServerErrors(err.response.data.errors)
        // }
    }

  return (
    <>
   

    {/* Office-form started */}
    <div className="col-6 offset-2 " style={{marginTop: '100px'}}>
    <h4 className="text-center">Tweet Form</h4>
    <form onSubmit={handleSubmit}>
            
        
            <div className="form-group">
                <label
                    className="form-label"
                    htmlFor="description"
                >Write Your Post</label>
                <textarea
                    className="form-control"
                    value={form.text}
                    onChange={handleChange} 
                    name="text"
                    id="description"
                >
                </textarea>
            </div>

            <div className="form-group">
                <label 
                    className="form-label"
                    htmlFor="image"
                >Upload an image</label>
                <input 
                    type="file" 
                    name="image"
                    id="image"
                    className="form-control"
                   
                    onChange={handleChange}   
                />
            </div>
            <br/>
            <br/>
           
            <input type="submit" className="btn btn-primary" />
        </form>
{/* {console.log(serverErrors) } */}
{/* <OfficeList/> */}
</div>

{/* {profile?
    ():(<div>
    <h3 style={{color:"red"}}>First you have to update your profile</h3>
</div>)} */}
</> 
  )
}
export default TweetForm