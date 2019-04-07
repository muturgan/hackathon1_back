import Knex  = require('knex');
import knexfile = require('../../knexfile.js');

export const knex = Knex(knexfile);
