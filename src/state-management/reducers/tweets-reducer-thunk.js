const initialState = {
    myTweets: [],
    serverErrors: [],
    allTweets:[]
}

const tweetsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_TWEETS' : {
            return {...state, allTweets: action.payload}
        }
        case 'SET_MY_TWEETS' : {
            return {...state, myTweets: action.payload}
        }
        case 'ADD_TWEET' : {
            return {...state, myTweets: [...state.data, action.payload ]}
        }
        case 'SET_ERRORS' : {
            return {...state, serverErrors: action.payload }
        }
        case 'UPDATE_TWEET' : {
            return { ...state, myTweets: state.myTweets.map((ele) => {
                if(ele._id == action.payload._id) {
                    return action.payload 
                } else {
                    return ele 
                }
            })}
        }
        case 'REMOVE_TWEET': {
            return {...state, myTweets: state.myTweets.filter(ele => ele._id != action.payload._id )}
        }
        default: {
            return { ...state }
        }
    }
}

export default tweetsReducer