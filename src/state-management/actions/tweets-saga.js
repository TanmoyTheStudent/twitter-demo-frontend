
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import * as actionTypes from './tweets-actiontype';
import {
    getTweetsSuccess,
    getMyTweetsSuccess,
    createTweetSuccess,
    updateTweetSuccess,
    removeTweetSuccess,
    setServerErrors
} from './tweets-action-saga';

function* fetchTweets(action) {
    try {
        const response = action.name
            ? yield call(axios.get, `http://localhost:3033/api/tweets/search?loadNum=${action.num}&limit=25&name=${action.name}`)
            : yield call(axios.get, `http://localhost:3033/api/tweets?loadNum=${action.num}&limit=25`);
        
        console.log(response)
        yield put(getTweetsSuccess({tweets:response.data.data.tweets,tweetsNo:response.data.data.totalTweets}));
        
    } catch (err) {
        alert(err.response);
    }
}

function* fetchMyTweets() {
    try {
        const response = yield call(axios.get, "http://localhost:3033/api/tweets/my", {
            headers: { Authorization: localStorage.getItem("token") }
        });
        yield put(getMyTweetsSuccess(response.data.data.tweets));
        console.log("my tweets",response)
    } catch (err) {
        alert(err.response.data);
        console.log(err)
    }
}

function* createTweet(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:3033/api/tweets', action.formData, {
            headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': "multipart/form-data"
            }
        });
        yield put(createTweetSuccess(response.data));
        yield put(setServerErrors([]));
        action.resetForm();
        alert("Tweet successfully submitted");
    } catch (err) {
        if (err.response.data.errors) {
            yield put(setServerErrors(err.response.data.errors));
            alert("Server error");
        } else {
            alert(err.response.data);
        }
    }
}

function* updateTweet(action) {
    try {
        const response = yield call(axios.put, `http://localhost:3033/api/tweets/${action.id}`, action.formData, {
            headers: {
                Authorization: localStorage.getItem('token'),
                'Content-Type': "multipart/form-data"
            }
        });
        yield put(updateTweetSuccess(response.data));
        yield put(setServerErrors([]));
        action.resetForm();
        action.toggle();
        alert("Tweet successfully updated");
    } catch (err) {
        if (err.response.data.errors) {
            yield put(setServerErrors(err.response.data.errors));
            alert("Validation error");
        } else {
            alert(err.response.data);
        }
    }
}

function* removeTweet(action) {
    try {
        const response = yield call(axios.delete, `http://localhost:3033/api/offices/${action.id}/owner`, {
            headers: { Authorization: localStorage.getItem("token") }
        });
        yield put(removeTweetSuccess(response.data));
    } catch (err) {
        alert(err.response.data);
    }
}

export function* watchTweetActions() {
    yield takeEvery(actionTypes.GET_TWEETS_REQUEST, fetchTweets);
    yield takeEvery(actionTypes.GET_MY_TWEETS_REQUEST, fetchMyTweets);
    yield takeEvery(actionTypes.CREATE_TWEET_REQUEST, createTweet);
    yield takeEvery(actionTypes.UPDATE_TWEET_REQUEST, updateTweet);
    yield takeEvery(actionTypes.REMOVE_TWEET_REQUEST, removeTweet);
}
