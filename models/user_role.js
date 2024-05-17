'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Role extends Model {
   
    static associate(models) {
      User_Role.belongsTo(models.Role, {foreignKey: 'roleCode', targetKey: 'code', as: 'value'})
    }
  }
  User_Role.init({
    userId: DataTypes.UUID,
    roleCode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User_Role',
  });
  return User_Role;
};