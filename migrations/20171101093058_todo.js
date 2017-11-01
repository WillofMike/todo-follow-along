
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todo', (table)=> {
      table.increments()
      table.string('title').notNullable()
      table.text('description')
      table.integer('priority').notNullable()
      table.boolean('done').defaultTo(false).notNullable()
      table.datetime('date').notNullable()
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todo');
};
