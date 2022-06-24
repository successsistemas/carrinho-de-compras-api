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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const cripto_service_1 = require("../cripto/cripto.service");
const api_database_service_copy_1 = require("../database/api-database.service copy");
let AuthService = class AuthService {
    constructor(DatabaseService, cripto, jwtService) {
        this.DatabaseService = DatabaseService;
        this.cripto = cripto;
        this.jwtService = jwtService;
    }
    async login(body) {
        const senha = body.senha;
        console.log(body.email);
        console.log("Usuário logado com sucesso!");
        return senha;
    }
    async validateuser(body) {
        const chave = 'criptografia';
        const cifra = await this.login(body);
        const encode = await this.cripto.publicEncript(cifra, chave);
        const db = this.DatabaseService.getConnection();
        const [rows] = await db.raw(`select email, senha from usuario where email ='${body.email}' and senha = '${encode}'`);
        if (rows.length > 0) {
            return { access_token: this.jwtService.sign({})
            };
        }
        throw new common_1.UnauthorizedException("Senha incorreta!");
    }
    async loginGoogle(body) {
        const db = this.DatabaseService.getConnection();
        console.log('Usuário logado com sucesso!');
        const [rows] = await db.raw(`SELECT senha FROM usuario WHERE senha = '${body.body.response.profileObj.googleId}' `);
        if (rows.length > 0) {
            return { access_token: this.jwtService.sign({})
            };
        }
        throw new common_1.UnauthorizedException("Não foi possível fazer o login");
    }
    async cadastrar(body) {
        const db = this.DatabaseService.getConnection();
        const cifra = body.data.senha;
        const chave = 'criptografia';
        const encode = await this.cripto.publicEncript(cifra, chave);
        console.log('Usuário adicionado com sucesso!');
        return await db.schema.raw(`INSERT INTO usuario (nome, email, senha, cpf, estado, cidade, rua, bairro, cep, numero_endereco) VALUES ('${body.data.nome}', '${body.data.email}', '${encode}', '${body.data.cpf}', '${body.data.estado}', '${body.data.cidade}', '${body.data.rua}', '${body.data.bairro}', '${body.data.cep}', '${body.data.numero}')`);
    }
    async cadastroGoogle(body) {
        const db = this.DatabaseService.getConnection();
        console.log('Usuário adicionado com sucesso!');
        const [rows] = await db.raw(`INSERT INTO usuario (nome, email, senha) VALUES ('${body.response.profileObj.name}', '${body.response.profileObj.email}', '${body.response.profileObj.googleId}')`);
        console.log(rows.affectedRows);
        if (rows.affectedRows > 0) {
            return { access_token: this.jwtService.sign({})
            };
        }
        else
            throw new common_1.UnauthorizedException("Não foi possível fazer o cadastro");
    }
    async cadastroDadosRestantesGoogle(data) {
        const db = this.DatabaseService.getConnection();
        console.log('Usuário atualizado com sucesso!');
        return await db.schema.raw(`UPDATE usuario SET cpf = '${data.data.cpf}', estado = '${data.data.estado}', cidade = '${data.data.cidade}', rua = '${data.data.rua}', bairro = '${data.data.bairro}', cep = '${data.data.cep}', numero_endereco = '${data.data.numero}' WHERE senha = '${data.data.GoogleId}' `);
    }
    async nomeUser(data) {
        const db = this.DatabaseService.getConnection();
        console.log('Nome encontrado com sucesso!');
        return await db.schema.raw(`SELECT nome from usuario where email = '${data.data.email}' `);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_database_service_copy_1.DatabaseService,
        cripto_service_1.CriptoService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map