
import * as actionTypes from './tweets-actiontype';

export const getTweetsRequest = (num,name) => ({ type: actionTypes.GET_TWEETS_REQUEST,num, name });
export const getTweetsSuccess = (data) => ({ type: actionTypes.GET_TWEETS_SUCCESS, payload: data });

export const getMyTweetsRequest = () => ({ type: actionTypes.GET_MY_TWEETS_REQUEST });
export const getMyTweetsSuccess = (data) => ({ type: actionTypes.GET_MY_TWEETS_SUCCESS, payload: data });

export const createTweetRequest = (formData, resetForm) => ({ type: actionTypes.CREATE_TWEET_REQUEST, formData, resetForm });
export const createTweetSuccess = (data) => ({ type: actionTypes.CREATE_TWEET_SUCCESS, payload: data });

export const updateTweetRequest = (id, formData, resetForm, toggle) => ({ type: actionTypes.UPDATE_TWEET_REQUEST, id, formData, resetForm, toggle });
export const updateTweetSuccess = (data) => ({ type: actionTypes.UPDATE_TWEET_SUCCESS, payload: data });

export const removeTweetRequest = (id) => ({ type: actionTypes.REMOVE_TWEET_REQUEST, id });
export const removeTweetSuccess = (data) => ({ type: actionTypes.REMOVE_TWEET_SUCCESS, payload: data });

export const setServerErrors = (errors) => ({ type: actionTypes.SET_SERVER_ERRORS, payload: errors });
