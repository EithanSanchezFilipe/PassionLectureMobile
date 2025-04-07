import { DataTypes, Sequelize } from "sequelize";
import { BookModel } from "../models/book.mjs";
import { AuthorModel } from "../models/author.mjs";
import { CategoryModel } from "../models/category.mjs";
import { CommentModel } from "../models/comment.mjs";
import { EditorModel } from "../models/editor.mjs";
import { UserModel } from "../models/user.mjs";
import { initAssociations } from "../models/associations.mjs";
import { books, authors, editors, categories } from "./data-mock.mjs";
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

await initAssociations(User, Editor, Comment, Category, Book, Author);
// Test the connection

sequelize
  .sync({ force: true })
  .then((_) => {
    initCat();
    initEdi();
    initAut();
    initEPub();
    //initBook();
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
const initBook = () => {
  books.map((book) => {
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
    });
  });
};
const initEPub = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const epubPath = path.resolve(__dirname, "./epubs/OliverTwist.epub");
  const epubBuffer = fs.readFileSync(epubPath);
  Book.create({
    name: "Oliver Twist",
    passage: "S'il vous plaît, monsieur, j’en veux encore.",
    summary:
      "Oliver Twist, un orphelin né dans un hospice, subit de nombreuses épreuves en grandissant dans la pauvreté. Il tombe entre les mains d'un gang de voleurs dirigé par Fagin, mais cherche à échapper à ce destin pour trouver amour et justice.",
    editionYear: 1838,
    pages: 608,
    epub: epubBuffer,
    category_fk: 1,
    author_fk: 1,
    editor_fk: 1,
  });
};

export default sequelize;
export { User, Editor, Comment, Category, Book, Author, sequelize };
