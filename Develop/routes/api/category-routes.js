const router = require('express').Router();
const {Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      },
    ],
  }).then((categoryData) => {
    res.json(categoryData);
    // be sure to include its associated Products
  });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      },
    ],
  }).then((categoryData) => {
    res.json(categoryData);
  });
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then((newCategory) => {
    res.json(newCategory)
    });
  });

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedCategory) => {
    if (!updatedCategory) {
      res.json({message: "Unable to update: invalid category id"})
    } else {
      res.json({message: "category successfully updated"})
    }
  });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  }) .then((deletedCategory) => {
    if (!deletedCategory) {
      res.json({message: "Unable to delete: invalid category id"})
    } else {
      res.json({message: "Category successfully deleted"})
    }
  });
});

module.exports = router;
