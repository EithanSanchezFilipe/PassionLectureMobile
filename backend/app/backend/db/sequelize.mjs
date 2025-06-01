import { DataTypes, Sequelize } from "sequelize";
import { BookModel } from "../models/book.mjs";
import { AuthorModel } from "../models/author.mjs";
import { CategoryModel } from "../models/category.mjs";
import { CommentModel } from "../models/comment.mjs";
import { EditorModel } from "../models/editor.mjs";
import { UserModel } from "../models/user.mjs";
import { TagModel } from "../models/tag.mjs";
import { BookTagModel } from "../models/book-tag.mjs";
import { initAssociations } from "../models/associations.mjs";
import { books, authors, editors, categories, tags } from "./data-mock.mjs";
import { EPub } from "epub2";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Create a new instance of Sequelize with the connection string to our database
const sequelize = new Sequelize("passionlecture", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 6033,
  logging: false,
  define: {
    freezeTableName: true,
  },
});

const Editor = EditorModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const Author = AuthorModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Book = BookModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const Tag = TagModel(sequelize, DataTypes);
const BookTag = BookTagModel(sequelize, DataTypes);

await initAssociations(
  User,
  Editor,
  Comment,
  Category,
  Book,
  Author,
  Tag,
  BookTag
);
// Test the connection

sequelize
  .sync({ force: true })
  .then(async (_) => {
    await initCat();
    await initEdi();
    await initAut();
    await initTag();
    await initBook();
    console.log("The database has been synchronized");
  })
  .catch((e) => {
    console.log(`The database couldn't be synchronized`, e);
  });
try {
  await sequelize.authenticate({});
  console.log("Connection to database has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const initCat = () => {
  categories.map((book) => {
    Category.create({ name: book.nom, id: book.id });
  });
};
const initEdi = () => {
  editors.map((editor) => {
    Editor.create({ id: editor.id, name: editor.nom });
  });
};
const initAut = () => {
  authors.map((author) => {
    Author.create({
      id: author.id,
      lastname: author.nom,
      firstname: author.prenom,
    });
  });
};
const initTag = () => {
  tags.map((tag) => {
    Tag.create({ id: tag.id, name: tag.name });
  });
};
const initBook = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  books.map((book) => {
    const epubPath = path.resolve(__dirname, `./epubs/${book.epub}`);
    const epubBuffer = fs.readFileSync(epubPath);
    Book.create({
      id: book.id,
      name: book.titre,
      passage: book.extrait,
      summary: book.resume,
      editionYear: book.annee_edition,
      pages: book.nombre_de_pages,
      category_fk: book.id_categorie,
      author_fk: book.id_auteur,
      editor_fk: book.id_editeur,
      epub: epubBuffer,
    });
  });
};

export default sequelize;
export { User, Editor, Comment, Category, Book, Author, sequelize, Tag };
