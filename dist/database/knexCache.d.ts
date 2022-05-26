import { Knex } from 'knex';
export declare const getKnex: (contrato: string) => Knex<any, any[]>;
export declare const saveKnexInstance: (contrato: string, instance: Knex) => void;
export declare const getOrCreateKnexInstance: (info: any) => Promise<Knex<any, any[]>>;
