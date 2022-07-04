import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import path from "path";
import { DatabaseService } from "src/database/api-database.service copy";

@Injectable()
export class ProdutosService {
	constructor(private DatabaseService: DatabaseService) {}
	
	
    async getAllProducts() {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT * FROM produto WHERE produto.empresa_id = 1`);
		return rows;
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

	  async getProductsFromEmpresa(id: number) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT * FROM produto WHERE produto.empresa_id = ${id} ORDER BY preco`);
		if(rows == 0) {
			throw Error(`Produtos da empresa com o ID '${id}' não foram encontrados.`);
		}	
		return rows;
	}

	async getProductsbyId(body:any, idEmpresa:number) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`select produto.id, nome, produto.image, descricao, preco, produtocol from produto where produto.id = ${body.idProduct}`);
		if(rows == 0) {
			throw Error(`Produtos da empresa com o ID '${body.idProduct}' não foram encontrados.`);
		}	
		return rows;
	}
	
  
}