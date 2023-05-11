const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Keyword = database.define('Keyword', {
    keywordId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Keyword