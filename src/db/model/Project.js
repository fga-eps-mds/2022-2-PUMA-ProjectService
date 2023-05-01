const { DataTypes } = require('sequelize');
const database = require('../AppDb');

const Project = database.define('Project', {
    projectId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Common_User",
                schema: "public",
            },
            key: "userId"
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
    semesterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: {
                tableName: "Semester",
                schema: "public",
            },
            key: "semesterId"
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expectedResult: {
        type: DataTypes.STRING,
        allowNull: false
    },
    feedback: {
        type: DataTypes.STRING
    },
    problem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM({
            values: ['SB', 'RL', 'AL', 'AC', 'RC', 'IC', 'EX', 'EC'],
        }),
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    freezeTableName: true,
})

module.exports = Project