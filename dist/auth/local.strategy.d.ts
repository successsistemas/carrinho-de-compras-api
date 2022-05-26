import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { DatabaseService } from 'src/database/api-database.service copy';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly authService;
    private DatabaseService;
    constructor(authService: AuthService, DatabaseService: DatabaseService);
}
export {};
