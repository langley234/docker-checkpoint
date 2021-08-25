
function initializeDatabase(knex) {
    console.log('working');

    knex.raw(`DROP TABLE IF EXISTS names`)
        .then(() => {
            knex.raw(`CREATE TABLE IF NOT EXISTS names (name_id SERIAL, first_name varchar(255), last_name varchar(255))`)
                .then(() => {
                    knex.raw(`DELETE FROM names`)
                        .then(() => {
                            knex.raw(`INSERT INTO names (first_name, last_name) VALUES ('John', 'Rambo'), ('John', 'Matrix'), ('Frank', 'Castle'), ('Danny', 'Iello')`)
                                .then((result) => {
                                    console.log('Finished Initialization');
                                })
                        })

                })
                .catch((error) => {
                    console.log('Error : ', error);
                })
        })
}

module.exports = { initializeDatabase };
