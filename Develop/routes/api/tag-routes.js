const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  }).then((tagData) => {
    res.json(tagData);
    // be sure to include its associated Product data
  });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
        through: ProductTag,
        as: "products",
      },
    ],
  }).then((tagData) => {
    res.json(tagData);
  });
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((newTag) => {
    res.json(newTag)
    });
  });

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedTag) => {
    if (!updatedTag) {
      res.json({message: "Unable to update: invalid tag id"})
    } else {
      res.json({message: "Tag successfully updated"})
    }
  });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  }) .then((deletedTag) => {
    if (!deletedTag) {
      res.json({message: "Unable to delete: invalid tag id"})
    } else {
      res.json({message: "Tag successfully deleted"})
    }
  });
});

module.exports = router;
