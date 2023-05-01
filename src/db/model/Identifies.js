const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Identifies = database.define('Identifies', {
    subAreaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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
        unique: true,
        references: {
            model: {
                tableName: "Subject",
                schema: "public",
            },
            key: "subjectId"
        },
    },
}, {
    freezeTableName: true,
})

module.exports = Identifies