import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {}; // initially empty
const middleware = [thunk];

// creates a Redux store that holds the complete state tree of the app
const store = createStore(
  rootReducer, // reducing function: given current state and an action to handle, returns updated state
  initialState, 
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;