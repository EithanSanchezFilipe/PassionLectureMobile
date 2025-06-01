const BookTagModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_bookTags",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { timestamps: false }
  );
};

export { BookTagModel };
