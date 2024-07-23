const initialState = {
    myTweets: [],
    serverErrors: [],
    allTweets: [],
    totalTweets:0
};

const tweetsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_TWEETS_SUCCESS': {
            return { ...state, allTweets: action.payload.tweets,totalTweets:action.payload.tweetsNo };
        }
        case 'GET_MY_TWEETS_SUCCESS': {
            return { ...state, myTweets: action.payload };
        }
        case 'CREATE_TWEET_SUCCESS': {
            return { ...state, myTweets: [...state.myTweets, action.payload] };
        }
        case 'SET_SERVER_ERRORS': {
            return { ...state, serverErrors: action.payload };
        }
        case 'UPDATE_TWEET_SUCCESS': {
            return { 
                ...state, 
                myTweets: state.myTweets.map((ele) => {
                    if(ele._id === action.payload._id) {
                        return action.payload;
                    } else {
                        return ele;
                    }
                }) 
            };
        }
        case 'REMOVE_TWEET_SUCCESS': {
            return { ...state, myTweets: state.myTweets.filter(ele => ele._id !== action.payload._id) };
        }
        default: {
            return { ...state };
        }
    }
};

export default tweetsReducer;
