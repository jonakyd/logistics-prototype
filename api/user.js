import {Router} from 'express';
import {Observable} from 'rxjs';
import {User} from '../orm';

export default () => {
  const router = Router();

  router.get('/', (req, res) =>
    Observable
      .fromPromise(User.findAll())
      .switchMap((users) => Observable.from(users))
      .reduce((acc, user) => {
        acc.push(user.get({plain: true}))
        return acc;
      }, [])
      .subscribe((usersJson) => res.json(usersJson))
  );
  router.get('/:id', function({params}, res) {
     Observable
      .fromPromise(User.findById(params.id))
      .map((user) => user.get({plain: true}))
      .subscribe((userJson) => res.json(userJson))
  });
  router.post('/', ({body = {}}, res, next) =>
    Observable
      .fromPromise(User.create(body))
      .map((user) => user.get({plain: true}))
      .subscribe(
        (userJson) => res.json(userJson),
        (e) => {
          switch(e.name) {
            case 'SequelizeValidationError':
            case 'SequelizeUniqueConstraintError':
              res.status(400).send(e.message);
              break;
            default:
              next(e);
          }
        }
      )
  );
  return router;
}