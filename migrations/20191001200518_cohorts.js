
exports.up = function(knex) {
  return knex.schema.createTable('Cohorts', (table) => {
    table.increments('id')
    table.string('title')
    table.string('slug')
    table.boolean('isActive')
    table.datetime('startDate')
    table.datetime('endDate')
  })
};

exports.down = function(knex) {
  return knex.schema.raw('DROP TABLE Cohorts')
};
