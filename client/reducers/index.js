import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import {
  SELECT_API, INVALIDATE_API,
  REQUEST_DATA, RECEIVE_DATA,
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

const rootReducer = combineReducers({
  dataByapiEndpoint,
  selectedapiEndpoint,
  routing,
});

export default rootReducer;
