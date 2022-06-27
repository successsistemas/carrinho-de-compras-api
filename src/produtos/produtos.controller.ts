import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";

@Controller()
export class ProdutosController {
    constructor(private ProdutosService: ProdutosService) {}
    @Get('produtos')
	GetAllProducts(@Body() body: any, @Query() params:any) {
		return this.ProdutosService.getAllProducts()
	}
  
	@Get('produtos/:id')
	findProductsById(@Param('id', ParseIntPipe) id:any) {
	  return this.ProdutosService.getProductsFromEmpresa(id).catch((e:any) => {
		throw new NotFoundException(e.message);
	  });
	}
}