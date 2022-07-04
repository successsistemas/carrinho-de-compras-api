import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import path from "path";
import { DatabaseService } from "src/database/api-database.service copy";

@Injectable()
export class UserService {
	constructor(private DatabaseService: DatabaseService) { }

	async getAllProducts(idUsuario: number) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT id_produto, marcado, nome AS nome_produto, produto.image AS image_produto, descricao AS descricao_produto, preco AS preco_produto, empresa.id AS id_empresa, empresa.title AS nome_empresa, empresa.cnpj AS cnpj_empresa, empresa.phone AS phone_empresa, idcarrinho AS id_carrinho, usuario_id, produto_carrinho.id AS id_produto_carrinho, empresa_id FROM carrinho INNER JOIN produto_carrinho ON produto_carrinho.carrinho_idcarrinho = ${idUsuario} INNER JOIN produto ON produto.id = produto_carrinho.id_produto INNER JOIN empresa ON empresa.id = produto.empresa_id ORDER BY preco_produto`);
		return rows;
	}

	async findById(id: number) {
		const absolutepath = path.resolve('./src/user/carrinho.json')
		const bufferJson: Buffer = readFileSync(absolutepath);
		const carts: [] = JSON.parse(bufferJson.toString());
		const todos = carts.find((json: any) => json?.userid === id);


		if (!todos) {
			throw Error(`Produto com o ID '${id}' não encontrado.`);
		}

		return todos;
	}

	async postToCart(idProduct: any) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`INSERT INTO produto_carrinho VALUES(default, 1, ${idProduct}, 0)`);
		return rows;

	}


	async removeItemFromCart(params: any) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`DELETE FROM produto_carrinho WHERE id_produto = ${params.idProduct}`);
		return rows;
	}

	async clearCart(params:any) {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`DELETE FROM produto_carrinho WHERE carrinho_idcarrinho = 1`);
		return rows;
	
	}

}
