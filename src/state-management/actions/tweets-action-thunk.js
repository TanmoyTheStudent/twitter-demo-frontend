import axios from 'axios'

export const startGetTweets = (name) => { 
    console.log(name)
    return async (dispatch) => {
        try {
            let response
            if(name){
                response = await axios.get(`http://localhost:3033/api/offices/search?city=${name}`)
            }else{
                 response = await axios.get('http://localhost:3033/api/tweets')
            }
            dispatch(setTweets(response.data))
            console.log("all tweets",response.data)
        } catch(err) {
            alert(err.response.data)
        }
    }
}

const setTweets = (data) => {
    return { 
        type: 'SET_TWEETS', payload: data 
    }
}

export const startGetMyTweets = (id) => { 
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3033/api/tweets/my",{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })

            dispatch(setMyTweets(response.data))
            console.log("my tweets",response.data)
        } catch(err) {
            console.log(err)
            alert(err.response.data)
        }
    }
}

const setMyTweets = (data) => {
    return { 
        type: 'SET_MY_TWEETS', payload: data 
    }
}

export const startCreateTweet = (formData, resetForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3033/api/tweets', formData,{
                 headers:{
                    Authorization:localStorage.getItem('token'),
                    'Content-Type':"multipart/form-data"
                }
                 })
            console.log(response)
            dispatch(addTweet(response.data))
            dispatch(setServerErrors([]))
            resetForm()
            alert("successfully office has been submitted, wait for admin-approval")
        } catch(err) {
            console.log(err.response)

            if(err.response.data.errors){
                dispatch(setServerErrors(err.response.data.errors))
                alert("server error")
            }else{
                alert("error",err.response.data)
            }
            //dispatch(setServerErrors(err.response.data))
            //dispatch(setServerErrors(err.response.data.errors))
        }
    }
}

const addTweet = (tweet) => {
    return {
        type: "ADD_TWEET",
        payload: tweet
    }
}

export const setServerErrors = (errors) => {
    return { 
        type: "SET_ERRORS",
        payload: errors 
    }
}

export const startUpdateTweet = (id, formData, resetForm, toggle) => {
    return async (dispatch) => {
        try {
            console.log("formData in office-actions/updateOffice",formData)
            const response = await axios.put(`http://localhost:3033/api/tweets/${id}`, formData,{
                headers:{
                   Authorization:localStorage.getItem('token'),
                   'Content-Type':"multipart/form-data"
               }
             }) 
            dispatch(updateTweet(response.data)) 
            dispatch(setServerErrors([]))
            resetForm()
            toggle()
            alert("successfully updated")
        } catch(err) {
            if(err.response.data.errors){
                dispatch(setServerErrors(err.response.data.errors))
                alert("validation error")
            }else{
                alert(err.response.data)
            }
        }
    }
}

const updateTweet = (tweet) => {
    return {
        type: 'UPDATE_TWEET',
        payload: tweet
    }
}

export const startSoftRemoveTweet = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:3033/api/offices/${id}/owner`,{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            dispatch(removeTweet(response.data))
        } catch(err) {
            alert(err.response.data)
        }
    }
}

const removeTweet= (office) => {
    return {
        type: 'REMOVE_TWEET',
        payload: office
    }
}