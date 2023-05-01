const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Subject = database.define('Subject', {
    subjectId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    courseSyllabus: {
        type: DataTypes.STRING
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Subject