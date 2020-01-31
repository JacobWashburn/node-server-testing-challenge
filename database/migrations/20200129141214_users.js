
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 80)
          .notNullable()
          .unique();
      tbl.string('password', 500)
          .notNullable();
      tbl.string('department', 60);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
