const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Identifies = database.define('Identifies', {
    subAreaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'identifies_UK',
        references: {
            model: {
                tableName: "Subarea",
                schema: "public",
            },
            key: "subAreaId"
        },
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'identifies_UK',
        references: {
            model: {
                tableName: "Subject",
                schema: "public",
            },
            key: "subjectId"
        },
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ['subAreaId', 'subjectId'],
            name: 'identifies_UK',
        }
    ],
    freezeTableName: true,
})

module.exports = Identifies