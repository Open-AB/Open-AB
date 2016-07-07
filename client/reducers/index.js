import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import {
  SELECT_API, INVALIDATE_API,
  REQUEST_DATA, RECEIVE_DATA,
  SIGN_IN, SIGN_OUT,
} from '../actions/api';

function selectedapiEndpoint(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_API:
      return action.apiEndpoint;
    default:
      return state;
  }
}

function data(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) {
  switch (action.type) {
    case INVALIDATE_API:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.data,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function dataByapiEndpoint(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_API:
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return Object.assign({}, state, {
        [action.apiEndpoint]: data(state[action.apiEndpoint], action),
      });
    default:
      return state;
  }
}

function user(state = { loggedIn: false }, action) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, action.data) || state;
    case SIGN_OUT:
      return { loggedIn: false };
    default:
      return state || {};
  }
}

const rootReducer = combineReducers({
  dataByapiEndpoint,
  selectedapiEndpoint,
  routing,
  user,
});

export default rootReducer;
