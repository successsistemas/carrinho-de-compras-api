/* eslint-disable prettier/prettier */
import knexfn, { Knex } from 'knex';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
	private knex: Knex;
	constructor() {

		this.knex = knexfn({
			client: 'mysql2',
			connection: {
				host: process.env.DB_HOST,
				port: 3309,
				user: process.env.DB_USER,
				password: process.env.DB_PASS,
				database: process.env.DB_DATABASE
			}
		})
	}
	getConnection() {
		return this.knex;
	}
}