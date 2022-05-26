import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
export declare class SiteSuccessDatabaseService {
    private knex;
    private registroRestaurado;
    constructor(configService: ConfigService);
    getConnection(): Promise<Knex<any, any[]>>;
    getConnectionDefa(): Knex<any, any[]>;
}
