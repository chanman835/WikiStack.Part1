const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const { db, Page, User } = require ('./models');
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views/index')
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join('__dirname', 'public')))

app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get('/', (req, res) => {
  res.redirect('/wiki')
})

const PORT = 3000;

const syncDatabase = async () => {
  await db.sync({force: false});

  app.listen(PORT, () => {
      console.log(`App listening in port ${PORT}`)
  });
}


syncDatabase()


