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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth/auth.service");
const jwt_auth_guard_1 = require("./auth/jwt-auth-guard");
const Users_1 = require("./users/Users");
let AppController = class AppController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(body) {
        return this.authService.validateUser(body);
    }
    async loginGoogle(body) {
        return this.authService.LoginGoogle(body);
    }
    getProfile(req) {
        return req.user;
    }
    adicionar(body) {
        return this.authService.cadastrar(body);
    }
    cadastroGoogle(body) {
        return this.authService.CadastroGoogle(body);
    }
    cadastroDadosRestantesGoogle(data) {
        return this.authService.CadastroDadosRestantesGoogle(data);
    }
    NomeUser(data) {
        return this.authService.NomeUser(data);
    }
};
__decorate([
    (0, common_1.UseGuards)(),
    (0, common_1.Post)('auth/login'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('auth/loginGoogle'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('auth/user'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('auth/cadastro'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_1.CadastroDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "adicionar", null);
__decorate([
    (0, common_1.Post)('auth/cadastro-google'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_1.CadastroGoogleDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cadastroGoogle", null);
__decorate([
    (0, common_1.Post)('auth/cadastro-dadosrestantes-google'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Users_1.DadosRestantesGoogleDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "cadastroDadosRestantesGoogle", null);
__decorate([
    (0, common_1.Post)('auth/DadosUser'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "NomeUser", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map