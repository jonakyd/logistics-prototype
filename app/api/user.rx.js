import {Observable} from 'rxjs'

export default class UserAPI {
  static create$ = ({name, type}) =>
    Observable.ajax({
        method: 'POST',
        url: '/api/user',
        body: {name, type}
    });
}