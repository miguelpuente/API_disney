'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany( models.Character ,{ through: 'moviecharacter' });
      this.belongsTo( models.Genre ,{ foreignKey: "genreId" });
    }
  }
  Movie.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    creation_date: DataTypes.DATE,
    qualification: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
    tableName: 'movies',
    timestamps: true,
    paranoid: true,
    deleted_at: 'destroyTime',

    defaultScope:{
      attributes: {
          exclude: ['genreId','createdAt','updatedAt','deletedAt'],
      },
    },
  });
  return Movie;
};