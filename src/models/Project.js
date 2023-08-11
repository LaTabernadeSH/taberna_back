const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      linkVideo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linkRepo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkDeploy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
