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
	async findById(id: number) {
		const absolutepath = path.resolve('./src/produtos/produtos.json')
		const bufferJson:Buffer = readFileSync(absolutepath);
		const products = JSON.parse(bufferJson.toString());
		const todos = products.find((title:any) => title?.id === id);
	
		if (!todos) {
		  throw Error(`Produto com o ID '${id}' não encontrado.`);
		}
	
		return todos;
	  }
  
}