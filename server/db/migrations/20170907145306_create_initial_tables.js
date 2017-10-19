exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('users', t => {
      t.string('id', 11).notNullable().unique();
      t.string('email', 30).notNullable().unique();
      t.string('phone_number', 12).notNullable();
      t.string('password', 60).notNullable();
      t.string('full_name', 60).notNullable();
      t.string('prefix', 4).notNullable();
      t.string('intro', 500).notNullable().defaultTo('No detail provided');
      t.string('address', 60).notNullable().defaultTo('Vancouver, BC, Canada');
      t.float('lat', 8, 5).notNullable().defaultTo(49.2820);
      t.float('lng', 8, 5).notNullable().defaultTo(-123.1171);
      t.integer('search_distance').notNullable().defaultTo(50000);
      t.boolean('search_ft').notNullable().defaultTo(true);
      t.boolean('search_pt').notNullable().defaultTo(true);
      t.boolean('search_temp').notNullable().defaultTo(true);
      t.boolean('get_notified').notNullable().defaultTo(true);
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('deleted_at');
    }),
    // alter table users add column geog_gis_loc geography(Point,4326);

    knex.schema.createTableIfNotExists('offices', t => {
      t.string('id', 11).notNullable().unique();
      t.string('name', 60).notNullable().unique();
      t.string('address', 60).notNullable();
      t.float('lat', 8, 5).notNullable();
      t.float('lng', 8, 5).notNullable();
      t.string('more_info', 500).notNullable().defaultTo('No detail provided');
      t.string('owner_id', 11).notNullable().references('users.id');
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('deleted_at');
    }),
    // alter table offices add column geog_gis_loc geography(Point,4326);

    knex.schema.createTableIfNotExists('vacancies', t => {
      t.string('id', 11).notNullable().unique();
      t.string('title', 30).notNullable();
      t.string('description', 500).notNullable();
      t.date('start_date').notNullable();
      t.date('end_date');
      t.string('type', 4).notNullable();
      t.boolean('anonymous').notNullable();
      t.string('office_id', 11).notNullable().references('offices.id');
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('vacancy_dates', t => {
      t.bigIncrements('id');
      t.date('start_date').notNullable();
      t.date('end_date').notNullable().defaultTo('2099-01-01');
      t.string('vacancy_id', 11).notNullable().references('vacancies.id');
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('applicant_avail_dates', t => {
      t.bigIncrements('id');
      t.date('date').notNullable();
      t.string('applicant_id', 11).notNullable().references('users.id');
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('deleted_at');
    }),

    knex.schema.createTableIfNotExists('applications', t => {
      t.string('id', 11).notNullable().unique();
      t.string('rand_msg_num', 5).notNullable();
      t.boolean('candidate_applied').notNullable().defaultTo(false);
      t.string('candidate_id', 11).notNullable().references('users.id');
      t.string('vacancy_id', 11).notNullable().references('vacancies.id');
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      t.timestamp('deleted_at');
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('applications'),
    knex.schema.dropTable('applicant_avail_dates'),
    knex.schema.dropTable('vacancy_dates'),
    knex.schema.dropTable('vacancies'),
    knex.schema.dropTable('offices'),
    knex.schema.dropTable('users')
  ]);
};
