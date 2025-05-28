import { Book, Category, Comment } from "../db/sequelize.mjs";
import { ValidationError, where } from "sequelize";
import { Op } from "sequelize";
import fs from "fs";
import { EPub } from "epub2";
import path from "path";
import e from "express";

export async function Create(req, res) {
  const {
    name,
    author,
    price,
    summary,
    editionYear,
    pages,
    category_fk,
    author_fk,
    editor_fk,
  } = req.body;
  const userId = req.user.id;
  Book.create({
    name,
    author,
    price,
    summary,
    editionYear,
    pages,
    user_fk: userId,
    category_fk,
    author_fk,
    editor_fk,
  })
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((e) => {
      //si c'est une erreur de validation renvoie le messgae personnalisé
      console.error(e);
      if (e instanceof ValidationError) {
        return res.status(400).json({ message: e.message });
      }
    });
}
export function Reach(req, res) {
  const id = req.params.id;
  if (id) {
    Book.findByPk(id)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            message: "Le livre n'existe pas",
          });
        }
        const tempDir = path.resolve("./app/temp");
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }

        const tempFilePath = path.resolve(tempDir, `book-${id}.epub`);
        console.log(book.epub);
        fs.writeFileSync(tempFilePath, book.epub);

        EPub.createAsync(tempFilePath)
          .then((epub) => {
            epub.getFile;
            epub.getImage(epub.metadata.cover, (err, data, mimeType) => {
              if (err) {
                console.error(
                  "Erreur lors de la récupération de la couverture :",
                  err
                );
                return res.status(500).json({
                  message: "Erreur lors de la récupération de la couverture",
                  error: err,
                });
              }

              res.setHeader("Content-Type", mimeType);
              fs.unlink(tempFilePath, (_) => {
                return res.send(data);
              });
            });
          })
          .catch((e) => {
            console.error("Error loading EPUB:", e);
            return res.status(500).json({
              message: "Erreur lors du chargement de l'EPUB",
              error: e,
            });
          });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          message: "Erreur lors de la recherche du livre",
          error,
        });
      });
  } else {
    res.status(400).json({
      message: "ID du livre non fourni",
    });
  }
}
export async function All(req, res) {
  const tempDir = path.resolve("./app/temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  try {
    let books;

    if (req.query.name) {
      if (req.query.name.length < 2) {
        return res.status(400).json({
          message:
            "Le terme de la recherche doit contenir au moins 2 caractères",
        });
      }
      const limit = req.query.limit ? parseInt(req.query.limit) : 3;
      books = await Book.findAll({
        where: { name: { [Op.like]: `%${req.query.name}%` } },
        order: [["name", "ASC"]],
        limit,
      });
    } else {
      books = await Book.findAll();
    }

    const coverDataArray = await Promise.all(
      books.map((book) => {
        return new Promise((resolve, reject) => {
          const tempFilePath = path.resolve(tempDir, `book-${book.id}.epub`);
          fs.writeFileSync(tempFilePath, book.epub);

          EPub.createAsync(tempFilePath)
            .then((epub) => {
              const coverId = epub.metadata.cover;
              if (!coverId) {
                fs.unlink(tempFilePath, () => {});
                return resolve({
                  id: book.id,
                  name: book.name,
                  cover: null,
                });
              }
              epub.getImage(coverId, (err, data, mimeType) => {
                fs.unlink(tempFilePath, () => {});
                if (err) {
                  console.error(
                    "Erreur de couverture pour le livre",
                    book.id,
                    err
                  );
                  return resolve({
                    id: book.id,
                    name: book.name,
                    cover: null,
                  });
                }

                const base64 = data.toString("base64");
                resolve({
                  id: book.id,
                  name: book.name,
                  cover: {
                    mimeType,
                    base64,
                  },
                });
              });
            })
            .catch((err) => {
              console.error("Erreur EPUB pour le livre", book.id, err);
              fs.unlink(tempFilePath, () => {});
              resolve({
                id: book.id,
                name: book.name,
                cover: null,
              });
            });
        });
      })
    );

    res.status(200).json({
      message: `Liste des livres avec leurs couvertures`,
      books: coverDataArray,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message:
        "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.",
      error: e,
    });
  }
}
export function Chapter(req, res) {
  const id = req.params.id;

  const tempDir = path.resolve("./app/temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  Book.findByPk(id).then((book) => {
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    const tempFilePath = path.resolve(tempDir, `book-${book.id}.epub`);
    fs.writeFileSync(tempFilePath, book.epub);

    EPub.createAsync(tempFilePath)
      .then((epub) => {
        const chapter = epub.flow[1]; // You could allow `req.query.chapterIndex` to be dynamic

        epub.getChapter(chapter.id, (err, text) => {
          fs.unlink(tempFilePath, () => {}); // Clean up temp file

          if (err) {
            console.error("Erreur de lecture du chapitre :", err);
            return res
              .status(500)
              .json({ message: "Erreur de lecture du chapitre", error: err });
          }

          res.status(200).send(
            `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${chapter.id}</title></head><body>${text}</body></html>` // HTML content of the chapter
          );
        });
      })
      .catch((e) => {
        fs.unlink(tempFilePath, () => {});
        console.error("Erreur de traitement EPUB :", e);
        return res
          .status(500)
          .json({ message: "Erreur de traitement EPUB", error: e });
      });
  });
}

export async function Delete(req, res) {
  Book.findByPk(req.params.id).then((deletedbook) => {
    if (!deletedbook) {
      const message =
        "Le produit demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      return res.status(404).json({ message });
    }
    if (deletedbook.user_fk !== req.user.id) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à effacer ce livre",
      });
    }
    return Book.destroy({
      where: { id: deletedbook.id },
    }).then((_) => {
      const message = `Le produit ${deletedbook.name} a bien été supprimé !`;
      res.status(201).json({ message, deletedbook });
    });
  });
}
export async function Rating(req, res) {
  const id = req.params.id;
  const { note, message } = req.body;
  console.log(req.params);
  const userId = req.user.id;
  Comment.create({
    user_fk: userId,
    book_fk: id,
    note: note,
    message: message,
  })
    .then((comment) => {
      return res.status(200).json({
        message: `le livre dont l'id vaut ${id} a bien été commenté`,
        data: comment,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de l'ajout de note du livre",
        error,
      });
    });
}
export async function DeleteComment(req, res) {
  Comment.findByPk(req.params.id)
    .then((comment) => {
      if (!comment) {
        const message =
          "Le commentaire demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
        return res.status(404).json({ message });
      }
      comment.destroy().then((deletecomment) => {
        const message = `Le commentaire a bien été supprimé !`;
        return res.status(201).json({ message, deletecomment });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Erreur lors de la suppression du commentaire",
        error,
      });
    });
}
export function Update(req, res) {
  const id = req.params.id;
  const data = { ...req.body };
  Book.findByPk(id)
    .then((book) => {
      if (!book) {
        res
          .status(400)
          .json({ message: `Le Livre avec l'id ${id} n'existe pas` });
      }
      if (book.user_fk !== req.user.id) {
        return res.status(403).json({
          message: "Vous n'êtes pas autorisé à modifier ce livre",
        });
      }
      book.update(data).then((bookupdate) => {
        return res.status(200).json({
          message: "Le livre a bien été mis à jour",
          data: bookupdate,
        });
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json({
        message:
          "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.",
      });
    });
}
export function GetComments(req, res) {
  const { id } = req.params;
  Comment.findAll({ where: { book_fk: id } })
    .then((comments) => {
      if (comments.length == 0) {
        return res
          .status(404)
          .json({ message: "Ce livre n'a pas de commentaires" });
      }
      return res.status(200).json({
        message: "La liste des commentaires à bien été récupérer",
        comments,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message:
          "Les commentaires n'ont pas pu être récupérés. Merci de réessayer dans quelques instants.",
        error,
      });
    });
}
