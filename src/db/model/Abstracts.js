const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Abstracts = database.define('Abstracts', {
    keywordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Keyword",
                schema: "public",
            },
            key: "keywordId"
        },
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Project",
                schema: "public",
            },
            key: "projectId"
        },
    },
    main: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Abstracts