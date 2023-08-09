const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        auto_increment: true,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM("POST", "BLOG"),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
