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
        unique: 'SUBAREA_UK',
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
        allowNull: false,
        unique: 'SUBAREA_UK',
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['knowledgeAreaId', 'description'],
            name: 'SUBAREA_UK',
        }
    ],
    freezeTableName: true
})

module.exports = Subarea