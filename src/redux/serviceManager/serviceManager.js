import axios from 'axios';
import {GET_FEEDS_URL} from '../utils/Url';
import {client} from '../../client';

export const getFeedData = ({dispatch, actionType}) => {
  axios
    .get(GET_FEEDS_URL, {
      headers: {
        'app-id': '6482a8fa426ba52c2173885e',
      },
    })
    .then(res => {
      //   console.log(res.data);
      dispatch({type: actionType, payload: res.data.data});
    })
    .catch(err => {
      console.log(err.message);
    });
};

export const getDataFromSanity = async ({query, dispatch, actionType}) => {
  return await client
    .fetch(query)

    .then(data => {
      dispatch({type: actionType, payload: data});
    })

    .catch(err => console.log(err.message));
};
