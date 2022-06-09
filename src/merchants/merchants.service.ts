import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";

@Injectable()
export class MerchantsService {
	getAllProducts() {
		const bufferJson:Buffer = readFileSync('produtos.json');
		const products = JSON.parse(bufferJson.toString());
		return products;
	}
}