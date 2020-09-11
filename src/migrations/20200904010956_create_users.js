//node_modules/.bin/knex migrate:make create_users --env test
//node_modules/.bin/knex migrate::latest --env test
exports.up = (knex) => {
    return knex.schema.createTable('users', (t) => {
        t.increments('Id').primary();
        t.string('name').notNull();
        t.string('email').notNull().unique();
        t.string('password').notNull();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
