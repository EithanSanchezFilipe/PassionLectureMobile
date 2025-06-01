import { Tag, Book } from "../db/sequelize.mjs";

const All = (req, res) => {
  Tag.findAll()
    .then((tags) => {
      if (tags.length == 0) {
        return res.status(200).json({
          message: `Aucun tag existant`,
        });
      }
      res.status(200).json({
        message: `Liste des tags`,
        data: tags,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la récupération des tags",
        error: err.message,
      });
    });
};

const GetBooks = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "Veuillez fournir un identifiant de tag valide.",
    });
  }
  Tag.findByPk(id, {
    include: [
      {
        model: Book,
        attributes: { exclude: ["epub"] },
      },
    ],
  })
    .then((tagWithBooks) => {
      console.log(tagWithBooks);
      res.json({
        message: `Liste de livres trouvées pour le tag ${tagWithBooks.name}`,
        data: tagWithBooks,
      });
    })
    .catch((error) => {
      console.log("Une erreur :", error);
      return res.status(500).json({
        error: "Une erreur s'est produite. Veuillez réessayer !",
      });
    });
};

export { All, GetBooks };
