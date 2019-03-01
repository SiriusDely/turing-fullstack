require('dotenv').config()
const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  if (process.env.DB_DEBUG) {
    const Database = use('Database')
    Database.on('query', console.log)
  }
});
