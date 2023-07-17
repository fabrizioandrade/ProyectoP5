const Sequelize = require("sequelize");
const db = require("../config/db.js");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password) {
    return await this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Users.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("admin", "customer"),
      allowNull: false,
      defaultValue: "customer",
    },
    salt: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "users",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const salt = bcrypt.genSaltSync(8);
        user.setDataValue("salt", salt);

        let hash = await user.hash(user.password, user.salt);
        user.setDataValue("password", hash);
      },
    },
  }
);

Users.prototype.hash = function (plainPassword, salt) {
  return bcrypt.hash(plainPassword, salt);
};

Users.prototype.validatePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = Users;
