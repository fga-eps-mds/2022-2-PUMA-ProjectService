const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Summarize = database.define('Summarize', {
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
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Subject",
                schema: "public",
            },
            key: "subjectId"
        },
    },
}, {
    freezeTableName: true
})

module.exports = Summarize