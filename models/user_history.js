module.exports = function (sequelize, DataTypes) {
  const UserHistory = sequelize.define("user_history", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: true,
    freezeTableName: true,
    updatedAt: false
  });

  return UserHistory;
}
