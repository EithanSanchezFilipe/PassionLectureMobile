const TagModel = (sequelize, DataTypes) => {
  return sequelize.define("t_tag", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le nom du tag est une propriété obligatoire",
        },
      },
    },
  });
};
export { TagModel };
