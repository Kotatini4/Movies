const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "user",
        {
            user_id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "user",
            schema: "movies",
            timestamps: false,
            indexes: [
                {
                    name: "user_pkey",
                    unique: true,
                    fields: [{ name: "user_id" }],
                },
                {
                    name: "idx_user_username",
                    unique: true,
                    fields: [{ name: "username" }],
                },
            ],
        }
    );
};
