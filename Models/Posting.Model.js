import { Sequelize } from "sequelize";
import db from '../Config/Database';

const {DataTypes} = Sequelize;

const Postings = db.define('kohi_social',{
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    image: DataTypes.STRING,
    url : DataTypes.STRING,
})

export default Postings;

// (async () => {
//     db.sync();
// })();
