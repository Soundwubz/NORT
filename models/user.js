module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    }, {timestamps: false});

    return User;
}

// continue building model, then test 