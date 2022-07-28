import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";

@Controller()
export class ProdutosController {
	constructor(private ProdutosService: ProdutosService) { }
	@Get('produtos')
	GetAllProducts(@Body() body: any, @Query() params: any) {
		return this.ProdutosService.getAllProducts()
	}

	@Get('produtos/:idEmpresa')
	findProductsByIdEmpresa(@Param('idEmpresa', ParseIntPipe) id: any) {
		return this.ProdutosService.getProductsFromEmpresa(id).catch((e: any) => {
			throw new NotFoundException(e.message);
		});
	}

	@Get('produtos/:idEmpresa/:idProduct')
	findProductbyId(@Param() productId: any, idEmpresa: any, id: any) {
		return this.ProdutosService.getProductsbyId(productId, id).catch((e: any) => {
			throw new NotFoundException(e.message);
		})


	}
}