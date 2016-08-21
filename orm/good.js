import {STRING} from 'sequelize';

export default (sequelize) =>
  sequelize.define('good', {
    name: {
      type: STRING,
      allowNull: false
    }
  });