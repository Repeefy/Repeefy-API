exports.seed = function(knex, Promise) {
    return deleteTables()
      .then(function() {
        return knex("user_type").insert([
            {
                id: 1,
                name: "personal"
            },
            {
                id: 2,
                name: "organization"
            }
        ]);
      })
      .then(function() {
        return knex("status").insert([
          {
            id: 1,
            value: "enabled",
          },
          {
            id: 2,
            value: "disabled",
          },
      ]);
    });

    function deleteTables() {
      return knex('user_type').del()
      .then(() => knex('status').del())
    }

  };
  