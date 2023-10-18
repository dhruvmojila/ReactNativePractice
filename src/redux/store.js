const {configureStore, combineReducers} = require('@reduxjs/toolkit');
const {default: reducers} = require('./reducers/reducers');

const rootReducer = combineReducers({
  postData: reducers,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
