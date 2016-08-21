import {handleAction, handleActions} from 'redux-actions';
import {combineReducers} from 'redux';
import _ from 'lodash';
import {
  retrieveUsers,
  createUser,
  retrieveUser
} from '../actions/user';

// Helpers
const findAndModify = (arr, item) => {
  arr = [...arr];
  const index = arr.indexOf(item);
  if (index < 0) return arr;
  arr.splice(index, 1, item);
  return arr;
}
const findAndDestroy = (arr, itemId) => {
  arr = [...arr];
  const index = arr.findIndex((item) => item._id === itemId);
  if (index < 0) return arr;
  arr.splice(index, 1);
  return arr;
}

const arrReducer = handleActions({
  [retrieveUsers]: (state, {payload}) =>
    payload ? payload : state,
  [createUser]: (state, {payload}) =>
    payload ? [...state, payload] : state,
  [retrieveUser]: (state, {payload}) =>
    payload ? findAndModify(state, payload) : state,
}, [])
const metaReducer = combineReducers({
  isRetrievingUsers: handleAction(retrieveUsers,
    (state, {meta: {isRetrievingUsers}}) =>
      _.isUndefined(isRetrievingUsers) ? state : isRetrievingUsers, false),
  isCreating: handleAction(createUser,
    (state, {meta: {isCreating}}) =>
      _.isUndefined(isCreating) ? state : isCreating, false),
  retrievingArr: handleAction(retrieveUser,
    (state, {meta: {isRetrieving, retrievingUserId}}) =>
      _.isUndefined(retrievingUserId) ? state[retrievingUserId] = state : isRetrieving, {}),
})

export default combineReducers({
  arr: arrReducer,
  meta: metaReducer
});