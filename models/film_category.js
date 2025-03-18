const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "film_category",
        {
            film_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "film",
                    key: "film_id",
                },
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "category",
                    key: "category_id",
                },
            },
            last_update: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.Sequelize.fn("now"),
            },
        },
        {
            sequelize,
            tableName: "film_category",
            schema: "movies",
            timestamps: false,
            indexes: [
                {
                    name: "film_category_pkey",
                    unique: true,
                    fields: [{ name: "film_id" }, { name: "category_id" }],
                },
            ],
        }
    );
    // Добавляем ассоциации
    FilmCategory.associate = (models) => {
        FilmCategory.belongsTo(models.film, {
            foreignKey: "film_id",
            as: "film",
        });
        FilmCategory.belongsTo(models.category, {
            foreignKey: "category_id",
            as: "category",
        });
    };

    return FilmCategory;
};
