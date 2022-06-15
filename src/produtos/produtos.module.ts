import { Module } from "@nestjs/common";
import { ProdutosController } from "./produtos.controller";
import { ProdutosService } from "./produtos.service";

@Module({
	imports: [ ProdutosModule],
	providers: [ProdutosService],
	controllers: [ProdutosController],
	exports: [ProdutosService]
})
export class ProdutosModule { }