const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Semester = database.define('Semester', {
    semesterId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'SEMESTRE_UK',
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
        unique: 'SEMESTRE_UK',
    },
    semester: {
        type: DataTypes.ENUM({
            values: ['1', '2'],
        }),
        allowNull: false,
        unique: 'SEMESTRE_UK',
    },
    status: {
        type: DataTypes.ENUM({
            values: ['AD', 'CD'],
        }),
        allowNull: false,
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
},{
    indexes: [
        {
            unique: true,
            fields: ['subjectId', 'year', 'semester'],
            name: 'SEMESTRE_UK',
        }
    ],
    freezeTableName: true,
})

module.exports = Semester