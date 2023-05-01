const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Subarea = database.define('Subarea', {
    subAreaId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    knowledgeAreaId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
            model: {
                tableName: "knowledge_Area",
                schema: "public",
            },
            key: "knowledgeAreaId"
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Subarea