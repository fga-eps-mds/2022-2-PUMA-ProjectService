const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Subarea = database.define('Subarea', {
    subAreaId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    knowledgeAreaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: {
                tableName: "Knowledge_Area",
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
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Subarea