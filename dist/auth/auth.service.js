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
const cripto_service_1 = require("../cripto/cripto.service");
const api_database_service_copy_1 = require("../database/api-database.service copy");
let AuthService = class AuthService {
    constructor(DatabaseService, cripto) {
        this.DatabaseService = DatabaseService;
        this.cripto = cripto;
    }
    async validateUser(body) {
        const db = this.DatabaseService.getConnection();
        const cifra = body.body.data.senha;
        const chave = 'criptografia';
        const encode = await this.cripto.publicEncript(cifra, chave);
        console.log("Usuário logado com sucesso!");
        const [rows] = await db.raw(`select email, senha from cadastro where email ='${body.body.data.email}' and senha = '${encode}'`);
        if (rows.length > 0) {
            return 'Logado com sucesso!';
        }
        throw new common_1.UnauthorizedException;
    }
    async LoginGoogle(body) {
        const db = this.DatabaseService.getConnection();
        console.log('Usuário logado com sucesso!');
        const [rows] = await db.raw(`SELECT senha FROM cadastro WHERE senha = '${body.body.response.profileObj.googleId}' `);
        if (rows.length > 0) {
            return body.body;
        }
        throw new common_1.UnauthorizedException;
    }
    async cadastrar(body) {
        const db = this.DatabaseService.getConnection();
        const cifra = body.data.senha;
        const chave = 'criptografia';
        const encode = await this.cripto.publicEncript(cifra, chave);
        console.log('Usuário adicionado com sucesso!');
        return await db.schema.raw(`INSERT INTO cadastro (nome, email, senha, cpf, estado, cidade, rua, bairro, cep, numero_endereco) VALUES ('${body.data.nome}', '${body.data.email}', '${encode}', '${body.data.cpf}', '${body.data.estado}', '${body.data.cidade}', '${body.data.rua}', '${body.data.bairro}', '${body.data.cep}', '${body.data.numero}')`);
    }
    async CadastroGoogle(body) {
        const db = this.DatabaseService.getConnection();
        console.log('Usuário adicionado com sucesso!');
        return await db.schema.raw(`INSERT INTO cadastro (nome, email, senha) VALUES ('${body.response.profileObj.name}', '${body.response.profileObj.email}', '${body.response.profileObj.googleId}')`);
    }
    async CadastroDadosRestantesGoogle(data) {
        const db = this.DatabaseService.getConnection();
        console.log('Usuário atualizado com sucesso!');
        return await db.schema.raw(`UPDATE cadastro SET cpf = '${data.data.cpf}', estado = '${data.data.estado}', cidade = '${data.data.cidade}', rua = '${data.data.rua}', bairro = '${data.data.bairro}', cep = '${data.data.cep}', numero_endereco = '${data.data.numero}' WHERE senha = '${data.data.GoogleId}' `);
    }
    async NomeUser(data) {
        const db = this.DatabaseService.getConnection();
        console.log('Nome encontrado com sucesso!');
        return await db.schema.raw(`SELECT nome from cadastro where email = '${data.data.email}' `);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_database_service_copy_1.DatabaseService,
        cripto_service_1.CriptoService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map