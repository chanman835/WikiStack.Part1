const express = require('express');
const router = express.Router();
const { userList, userPages } = require('../views');
const { db, User, Page } = require('../models');

module.exports = router;

router.get('/', async (req, res, next) => {
  const user = await User.findAll(req.body);
  res.send(userList(user));
})

router.get('/:id', async (req, res, next) => {
  try{
    const userId = req.params.id;

  const user = await User.findByPk(userId);
  const pages = await Page.findAll({
    where: { authorId: userId }
  });
  res.send(userPages(user, pages))
  } catch (err) {
    next(err);
  }
})
