import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";

@Controller('produtos')
export class ProdutosController {
    constructor(private ProdutosService: ProdutosService) {}
    @Get('todos')
	GetAllProducts(@Body() body: any, @Query() params:any) {
		return this.ProdutosService.getAllProducts()
	}
    @Get('testes') 
	GetTestes(@Body() body:any) {

		return `Testes`;
	}
		
	
}