const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
  }
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },

  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  }

})

Page.belongsTo(User, { as: 'author' });


function makeSlug (title) {
  return title.split(' ')
  .map((word) => {
    const letters = word.split('');
    const newWord = letters.filter((char) => {
      const use = 'abcdefghijklmnopqrstuvwxyz1234567890'
      return use.indexOf(char.toLowerCase()) !== -1;
    })
    return newWord.join('');
  })
  .join('_');
}

Page.beforeValidate((pageInstance) => {
  pageInstance.slug = makeSlug(pageInstance.title)
})

module.exports = {
  db,
  Page,
  User,
}
