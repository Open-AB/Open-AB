import fetch from 'isomorphic-fetch';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SELECT_API = 'SELECT_API';
export const INVALIDATE_API = 'INVALIDATE_API';

export function selectApiEndpoint(apiEndpoint) {
  return {
    type: SELECT_API,
    apiEndpoint,
  };
}

export function invalidateApiEndpoint(apiEndpoint) {
  return {
    type: INVALIDATE_API,
    apiEndpoint,
  };
}

function requestData(apiEndpoint) {
  return {
    type: REQUEST_DATA,
    apiEndpoint,
  };
}

function receiveData(apiEndpoint, json) {
  return {
    type: RECEIVE_DATA,
    apiEndpoint,
    data: json,
    receivedAt: Date.now(),
  };
}

function fetchData(apiEndpoint) {
  return dispatch => {
    dispatch(requestData(apiEndpoint));
    return fetch(`http://localhost:8888${apiEndpoint}`) // TODO: grab the IP address programatically
      .then(response => response.json())
      .then(json => dispatch(receiveData(apiEndpoint, json)));
  };
}

function shouldfetchData(state, apiEndpoint) {
  const data = state.dataByapiEndpoint[apiEndpoint];
  if (!data) {
    return true;
  }  if (data.isFetching) {
    return false;
  }
  return data.didInvalidate;
}

export function fetchDataIfNeeded(apiEndpoint) {
  return (dispatch, getState) => {
    if (shouldfetchData(getState(), apiEndpoint)) {
      return dispatch(fetchData(apiEndpoint));
    }
  };
}
