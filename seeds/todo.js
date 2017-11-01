
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(function () {
      // Inserts seed entries
      return knex('todo').insert([
        {id: 100, title: 'Feed the cats', priority: 2, date: new Date()},
        {id: 200, title: 'Eat Dinner', priority: 1, date: new Date()},
        {id: 300, title: 'Build CRUD app', priority: 4, date: new Date()},
        {id: 400, title: 'Mastery', priority: 5, date: new Date()},
      ]);
    });
};
