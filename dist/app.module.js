"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const pedidos_module_1 = require("./user/pedidos/pedidos.module");
const pedidos_controller_1 = require("./user/pedidos/pedidos.controller");
const pedidos_service_1 = require("./user/pedidos/pedidos.service");
const carrinho_module_1 = require("./carrinho/carrinho.module");
const empresas_module_1 = require("./empresas/empresas.module");
const empresas_service_1 = require("./empresas/empresas.service");
const empresas_controller_1 = require("./empresas/empresas.controller");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const configuracao_1 = __importDefault(require("./config/configuracao"));
const cripto_module_1 = require("./cripto/cripto.module");
const database_module_1 = require("./database/database.module");
const produtos_module_1 = require("./produtos/produtos.module");
const user_module_1 = require("./user/user.module");
const carrinho_controller_1 = require("./carrinho/carrinho.controller");
const api_database_service_copy_1 = require("./database/api-database.service copy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            pedidos_module_1.PedidosModule,
            carrinho_module_1.CarrinhoModule,
            empresas_module_1.EmpresasModule,
            auth_module_1.AuthModule, produtos_module_1.ProdutosModule, cripto_module_1.CriptoModule, database_module_1.DatabaseModule, user_module_1.UserModule, config_1.ConfigModule.forRoot({
                load: [configuracao_1.default],
                isGlobal: true
            })
        ],
        controllers: [
            pedidos_controller_1.PedidosController,
            empresas_controller_1.EmpresasController, app_controller_1.AppController, carrinho_controller_1.CarrinhoController
        ],
        providers: [
            pedidos_service_1.PedidosService,
            empresas_service_1.EmpresasService, config_1.ConfigService, api_database_service_copy_1.DatabaseService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map