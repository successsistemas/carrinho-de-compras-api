import { Knex } from 'knex';
export declare class DatabaseService {
    private knex;
    constructor();
    getConnection(): Knex<any, any[]>;
}
