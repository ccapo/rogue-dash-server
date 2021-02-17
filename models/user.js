module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("user", {
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
    passwordHash: {
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
    indexes: [
      {
        name: "score_uuid_name_unique_idx",
        unique: true,
        fields: ["uuid", "name"]
        
      }
    ]
  });

  return User;
}
