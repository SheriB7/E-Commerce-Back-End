const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTage = await Tag.create(req.body)
    res.status(200).json(newTage);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(updateTagData);
  } catch (err) {
    res.status(400).json(err)
  }
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deteTag) {
      res.status(404).json({ message: 'Tag not with this id!' });
      return;
    }
    res.status(200).json(deteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
