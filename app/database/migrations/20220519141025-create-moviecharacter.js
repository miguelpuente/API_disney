'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('moviecharacters', {
      movieId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "movies",
          key:"id"
        }
      },
      characterId: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          references: {
            model: "characters",
            key:"id"
          }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('moviecharacters');
  }
};