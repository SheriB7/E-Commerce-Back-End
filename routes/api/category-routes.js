const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoriesData = await Category.findAll({ include: [{model:Product}]
    })
    res.status(200).json(categoriesData);
  }
  catch(err){
    res.status(400).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
    const categorieData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categorieData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categorieData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try{
    const newCategoryData = await Category.create(req.body)
    res.status(200).json(newCategoryData);
  }
  catch(err){
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    const updateCategoryData = await Category.update(req.body, 
      {where: {id: req.params.id,
      },
    });
    if (!updateCategoryData[0]) {
      res.status(404).json({ message: 'Category does not exist with this id!' });
      return;
    }
    res.status(200).json(updateCategoryData);
  }
  catch(err){
    res.status(400).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const deteCategory = await Category.destroy({
    where: {
    id: req.params.id,
    },
    });
    if (!deteCategory) {
      res.status(404).json({ message: 'Category does not exist with this id!' });
      return;
    }
    res.status(200).json(deteCategory);
  }catch(err){
    res.status(400).json(err)
  }
});

module.exports = router;
