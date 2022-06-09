import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import path from "path";

@Injectable()
export class ProdutosService {
	
    getAllProducts() {
		const absolutepath = path.resolve('./src/produtos/produtos.json')
		const bufferJson:Buffer = readFileSync(absolutepath);
		const products = JSON.parse(bufferJson.toString());
		return products;
	}
}