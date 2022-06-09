import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";

@Injectable()
export class ProdutosService {
	
    getAllProducts() {
		const bufferJson:Buffer = readFileSync('./src/produtos/produtos.json');
		const products = JSON.parse(bufferJson.toString());
		return products;
	}
}