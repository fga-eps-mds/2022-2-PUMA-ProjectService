const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Classes_Schedule = database.define('Classes_Schedule', {
    classScheduleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    classId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: {
                tableName: "Classes",
                schema: "public",
            },
            key: "classId"
        },
    },
    day: {
        type: DataTypes.ENUM({
            values: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
        }),
        allowNull: false
    },
    start: {
        type: DataTypes.STRING,
    },
    finish: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true
})

module.exports = Classes_Schedule