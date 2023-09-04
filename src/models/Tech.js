const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Tech",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.ENUM([
          "JavaScript",
          "Python",
          "Java",
          "C#",
          "PHP",
          "C++",
          "HTML",
          "CSS",
          "Tailwind",
          "Bootstrap",
          "React",
          "Next.js",
          "Angular",
          "Vue",
          "Node.js",
          "Django y Flask",
          "Express.jss",
          "Spring Boot",
          "Ruby on Rails",
          ".NET",
          "Swift",
          "Go",
          "MySQL",
          "PostgreSQL",
          "MomgoDB",
          "Redis",
          "SQLite",
          "Microsoft SQL Server",
          "Elasticsearch",
          "Amazon DynamoDB",
          "Cassandra",
          "Redux",
          "Vuex",
          "Mobox",
        ]),
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
