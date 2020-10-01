const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views')

router.get('/', (req, res) => {
  res.send('main wiki page')
})

router.get('/add/', (req, res) => {
  try {
    res.send(addPage());
  } catch(err) {
    console.log(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create(req.body)

    res.redirect('/');
  } catch(err) {
    console.log(err)
  }
})

router.get('/:slug', async (req, res) => {
  const slug = req.params.slug;
  const pageData = await Page.findOne({
    where: {slug: slug}
  });
  res.json(pageData)
  // console.log(res.json(pageData))
})

module.exports = router;
