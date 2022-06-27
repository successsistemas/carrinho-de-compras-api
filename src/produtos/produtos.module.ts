import { Module } from "@nestjs/common";
import { DatabaseService } from "src/database/api-database.service copy";
import { ProdutosController } from "./produtos.controller";
import { ProdutosService } from "./produtos.service";

@Module({
	imports: [ ProdutosModule],
	providers: [ProdutosService, DatabaseService],
	controllers: [ProdutosController],
	exports: [ProdutosService]
})
export class ProdutosModule { }