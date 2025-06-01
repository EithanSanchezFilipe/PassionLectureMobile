const initAssociations = async (
  User,
  Editor,
  Comment,
  Category,
  Book,
  Author,
  Tag,
  BookTag
) => {
  User.hasMany(Comment, {
    foreignKey: "user_fk",
  });
  Comment.belongsTo(User, {
    foreignKey: "user_fk",
  });
  Book.hasMany(Comment, {
    foreignKey: "book_fk",
  });
  Comment.belongsTo(Book, {
    foreignKey: "book_fk",
  });
  Book.belongsTo(Category, {
    foreignKey: "category_fk",
  });
  Category.hasMany(Book, {
    foreignKey: "category_fk",
  });
  Book.belongsTo(Editor, {
    foreignKey: "editor_fk",
  });
  Editor.hasMany(Book, {
    foreignKey: "editor_fk",
  });
  Author.hasMany(Book, {
    foreignKey: "author_fk",
  });
  Book.belongsTo(Author, {
    foreignKey: "author_fk",
  });
  Book.belongsTo(User, {
    foreignKey: "user_fk",
  });
  User.hasMany(Book, {
    foreignKey: "user_fk",
  });
  Book.belongsToMany(Tag, {
    through: BookTag,
    foreignKey: "book_fk",
  });
  Tag.belongsToMany(Book, {
    through: BookTag,
    foreignKey: "tag_fk",
  });
};
export { initAssociations };
