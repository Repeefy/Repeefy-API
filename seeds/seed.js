exports.seed = function(knex, Promise) {
    function deleteTables() {
        return knex("user_type").del();
    }

    return deleteTables()
      .then(function() {
        return knex("user_type").insert([
            {
                id: 1,
                name: "registered_user"
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
  };
  