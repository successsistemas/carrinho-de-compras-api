import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";

@Controller('produtos')
export class ProdutosController {
    constructor(private ProdutosService: ProdutosService) {}
    @Get()
	GetAllProducts(@Body() body: any, @Query() params:any) {
		return this.ProdutosService.getAllProducts()
	}
  
	@Get('/:id')
	findProductsById(@Param('id', ParseIntPipe) id:any) {
	  return this.ProdutosService.findById(id).catch((e:any) => {
		throw new NotFoundException(e.message);
	  });
	}
}