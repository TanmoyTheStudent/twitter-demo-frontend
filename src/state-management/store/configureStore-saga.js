import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import tweetsReducer from '../reducers/tweets-reducer-saga';
// import other reducers here

import { watchTweetActions } from '../actions/tweets-saga';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers({
            tweets: tweetsReducer
            // add other reducers here
        }),
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(watchTweetActions);

    return store;
};

export default configureStore;
