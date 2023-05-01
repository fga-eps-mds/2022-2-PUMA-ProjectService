const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Semester = database.define('Semester', {
    semesterId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subjectId: {
        type: DataTypes.STRING,
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
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    semester: {
        type: DataTypes.ENUM({
            values: ['1', '2'],
        }),
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.ENUM({
            values: ['AD', 'CD'],
        }),
        allowNull: false,
        defaultValue: false
    },
    deleted: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true
})

module.exports = Semester