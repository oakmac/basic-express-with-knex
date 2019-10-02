
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Students').del()
    .then(function () {
      // Inserts seed entries
      return knex('Students').insert([
        {
          name: 'Aubrey Snider',
          isActive: true,
          cohortId: 1
        },
        {
          name: 'Joey',
          isActive: true,
          cohortId: 1
        },
        {
          name: 'Ryan',
          isActive: false,
          cohortId: 1
        },
        {
          name: 'Sarah',
          isActive: true,
          cohortId: 2
        }
      ]);
    });
};
