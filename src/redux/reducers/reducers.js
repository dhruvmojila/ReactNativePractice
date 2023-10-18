import {GET_FEEDS, GET_USER, GET_USER_SANITY} from '../utils/actionTypes';

let initialState = {
  posts: [],
  user: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FEEDS:
      return {...state, posts: [...state.posts, action.payload]};
    case GET_USER:
      console.log(action.payload, 'payload from reducer');
      return {...state, user: action.payload};
    case GET_USER_SANITY:
      return {...state, sanityUsers: action.payload};
    default:
      return state;
  }
};
