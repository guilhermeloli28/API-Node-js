const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');
const { query } = require('express');


//TODO criar chaveamento dinamico
app.db = knex(knexfile.test);

consign( {cwd: 'src', verbose: false} ) //caminho padrão 
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./router')
.then('./config/routes.js')
.then('./services')
.into(app)

app.get('/',(req, res) => {
    res.status(200).send('Home');
});

// app.use((err, req, res, next) => {
//     const { name, message } = err;

//     if ( name === 'ValidationError' ) res.status(400).json({ error: message });
//     else res.status(500).json({ name, message, stack});
//     next(err);
// }); 

// app.db.on('query', (query) => {
//     console.log({sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : ''});
// })
// .on('query-response', response => console.log(response))
// .on('error', error => console.log(error));

module.exports = app;