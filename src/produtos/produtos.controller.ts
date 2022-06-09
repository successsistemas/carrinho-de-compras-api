import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";

@Controller("produtos")
export class ProdutosController {
    constructor(private ProdutosService: ProdutosService) {}
    @Get()
	GetAllProducts(@Body() body: any, @Query() params:any) {
		const result = this.ProdutosService.getAllProducts()
		return result;
	}
}