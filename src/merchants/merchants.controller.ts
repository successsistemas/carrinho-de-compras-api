import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { MerchantsService } from "./merchants.service";

@Controller("merchants")
export class MerchantsController {

	constructor(private merchantsService: MerchantsService) { }

	@Get()
	getMerchants() {

		const merchants: any[] = [];

		const merchant = {
			id: 2,
			name: "string",
			corporateName: "string",
			miniaturePic: "http://gsobmidia.com.br/uploads/lojas/895/bk_1604508481.png",
			description: "string",
			type: "RESTAURANT",
			status: "AVAILABLE",
		}
		//simulando o banco de dados
		for (let i = 1; i <= 5; i++) {
			merchants.push(merchant)
		}

		return merchants
	}
	@Get(':merchantId')
	getMerchant(@Param('merchantId') merchantId: string) {
		const merchant = {
			id: 2,
			name: "string",
			miniaturePic: "http://gsobmidia.com.br/uploads/lojas/895/bk_1604508481.png",
			corporateName: "string",
			description: "string",
			type: "RESTAURANT",
			status: "AVAILABLE",
			createdAt: "2022-07-01T14:53:00.550Z",
			address: {
				country: "string",
				state: "string",
				city: "string",
				postalCode: "string",
				district: "string",
				street: "string",
				number: "string",
				latitude: 0,
				longitude: 0
			}
		}
		return merchant;
	}

	@Get('produtos/:idEmpresa')
	GetAllProducts(@Body() body: any, @Query() params:any) {
		const result = this.merchantsService.getAllProducts();
		return result;
	}


}
