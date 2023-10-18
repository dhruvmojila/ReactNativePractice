import {getDataFromSanity, getFeedData} from '../serviceManager/serviceManager';
import {GET_FEEDS, GET_USER, GET_USER_SANITY} from '../utils/actionTypes';

export const getFeedDataAction = () => {
  return dispatch =>
    getFeedData({
      actionType: GET_FEEDS,
      dispatch,
    });
};
export const getUserDataAction = payload => {
  console.log(payload, 'payload');
  return dispatch =>
    dispatch({
      payload,
      type: GET_USER,
      dispatch,
    });
};

export const getSanityDataAction = query => {
  return dispatch =>
    getDataFromSanity({
      query,

      actionType: GET_USER_SANITY,

      dispatch,
    });
};
