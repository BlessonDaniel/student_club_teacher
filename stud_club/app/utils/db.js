const knex= require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'database1',
        password : 'faustina23',
        database : 'sample',
        charset  : 'utf8'
      }
})
const bookshelf = require('bookshelf')(knex)
module.exports= bookshelf