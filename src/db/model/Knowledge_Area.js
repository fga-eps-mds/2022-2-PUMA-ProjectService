const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const knowledge_Area = database.define('Knowledge_Area', {
    knowledgeAreaId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    knowledgeArea: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = knowledge_Area