
exports.up = function (knex) {
    return knex.schema.createTable('names', table => {
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('names');
};
