module.exports = function (sequelize, DataTypes) {
 var libraryLists = sequelize.define("libraryLists", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: "Other",
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return libraryLists;
};