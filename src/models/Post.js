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
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ timestamps: false }
	);
};
