import {STRING, INTEGER, DECIMAL} from 'sequelize';

export default (sequelize) =>
  sequelize.define('user', {
    name: {
      type: STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: INTEGER,
      allowNull: false
    },
    stockistLat: {
      type: DECIMAL
    },
    stockistLng: {
      type: DECIMAL
    }
  });