import Sequelize from 'sequelize';
import {Observable} from 'rxjs';
import GoodDef from './good';
import VoteDef from './vote';
import UserDef from './user';

const sequelize = new Sequelize(
  'database',
  'username',
  'password', {
    dialect: 'sqlite',
    storage: 'db.sqlite'
  });

export const Good = GoodDef(sequelize);
export const Vote = VoteDef(sequelize);
export const User = UserDef(sequelize);
export const sync = () =>
  Observable
    .combineLatest(
      Observable.fromPromise(Vote.sync()),
      Observable.fromPromise(Good.sync()),
      Observable.fromPromise(User.sync())
    )
    .take(1)

User.hasMany(Good);
User.hasMany(Vote);
Vote.belongsTo(Good);
Vote.belongsTo(User);