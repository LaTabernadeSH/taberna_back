const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Like",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
    
    },
    { timestamps: true }
  );
};