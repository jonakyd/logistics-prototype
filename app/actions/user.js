import {createAction} from 'redux-actions';
import {Observable} from 'rxjs';
import UserApi from '../api/user.rx'

export const retrieveUsers = createAction('RETRIEVE_USERS',
  ({users}) => users,
  ({isRetrievingUsers}) => ({isRetrievingUsers}));
export const createUser = createAction('CREATE_USER',
  ({user}) => user,
  ({isCreating}) => ({isCreating}));
export const retrieveUser = createAction('RETRIEVE_USER',
  ({user}) => user,
  ({isRetrieving, retrievingUserId}) => ({isRetrieving, retrievingUserId}));
export const createUserSub = ({name, type}) =>
  (actions, {dispatch, getState}) => {
    dispatch(createUser({isCreating: true}))

    return UserApi
      .create$({name, type})
      .map(({response}) =>
        createUser({
          user: response,
          isCreating: false
        })
      );
  }