"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const knex_1 = require("knex");
const common_1 = require("@nestjs/common");
let DatabaseService = class DatabaseService {
    constructor() {
        this.knex = (0, knex_1.default)({
            client: 'mysql2',
            connection: {
                host: process.env.DB_HOST,
                port: 3309,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE
            }
        });
    }
    getConnection() {
        return this.knex;
    }
};
DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=api-database.service%20copy.js.map