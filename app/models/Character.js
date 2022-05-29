'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany( models.Movie ,{ through: 'moviecharacter'});
    }
  }
  Character.init({
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    history: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Character',
    tableName: 'characters',
    timestamps: true,
    paranoid: true,
    deleted_at: 'destroyTime',

    defaultScope:{
      attributes: {
          exclude: ['createdAt','updatedAt','deletedAt'],
      },
    },
  });
  return Character;
};