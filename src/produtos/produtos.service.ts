import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/api-database.service copy";

@Injectable()
export class ProdutosService {
	constructor(private DatabaseService: DatabaseService) { }


	async getAllProducts() {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT * FROM produto WHERE produto.empresa_id = 1`);
		return rows;
	}


	async getProductsFromEmpresa(id: number) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT produto.id, produto.empresa_id, empresa.title, empresa.phone, empresa.email, empresa.address, produto.nome, produto.image, produto.descricao, produto.preco, produto.quantidade FROM produto, empresa WHERE produto.empresa_id = ${id} AND empresa.id = ${id} ORDER BY preco;`);
		if (rows == 0) {
			throw Error(`Produtos da empresa com o ID '${id}' não foram encontrados.`);
		}
		return rows;
	}

	async getProductsbyId(body: any, idEmpresa: number) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT produto.id, nome, produto.image, produto.quantidade, descricao, preco, empresa.title FROM produto, empresa WHERE produto.id = ${body.idProduct} AND empresa.id = ${body.idEmpresa}`);
		if (rows == 0) {
			throw Error(`Produtos da empresa com o ID '${body.idProduct}' não foram encontrados.`);
		}
		return rows;
	}


}