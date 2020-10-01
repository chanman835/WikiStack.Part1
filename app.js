const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const { db } = require ('./models');
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views/index')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join('__dirname', 'public')))

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get('/', (req, res) => {
  res.send(main(''))
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
});
