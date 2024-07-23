import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import tweetsReducer from '../reducers/tweets-reducer'
// import spacesReducer from '../reducers/spaces-reducer'
// import bookingsReducer from '../reducers/bookings-reducer'

const configureStore = () => {
    const store = createStore(combineReducers({
        tweets: tweetsReducer 
        // spaces: spacesReducer,
        // bookings:bookingsReducer
    }), applyMiddleware(thunk))
    return store 
}

export default configureStore