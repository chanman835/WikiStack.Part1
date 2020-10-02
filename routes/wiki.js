const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { main, addPage, wikiPage } = require('../views')

router.get('/', async (req, res) => {
  const allPages = await Page.findAll();
  res.send(main(allPages));
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
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      }
    });

    const page = await Page.create(req.body);
    // console.log(page.prototype);
    await page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
  } catch(err) {
    console.log(err)
  }
})

router.get('/:slug', async (req, res) => {
  const slug = req.params.slug;
  const pageData = await Page.findOne({
    where: {slug: slug}
  });
  const author = await pageData.getAuthor();
  res.send(wikiPage(pageData, author));
})

module.exports = router;
