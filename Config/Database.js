import { Sequelize } from "sequelize";

const db = new Sequelize('social', 'root', '',{host: 'localhost', dialect: 'mysql'})

export default db