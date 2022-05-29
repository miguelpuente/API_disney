module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "_disney_test",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",


  // configurar Seeds
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeSeeds",
  
  // configurar migraciones
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",

  define:{
    // Genera claves foraneas de este tipo user_id en vez de userId
    underscored: false,
  }
}
