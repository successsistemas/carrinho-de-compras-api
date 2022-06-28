import { Body, Injectable } from "@nestjs/common";
import { json } from "express";
import { appendFileSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { DatabaseService } from "src/database/api-database.service copy";

@Injectable()
export class UserService {
	constructor(private DatabaseService: DatabaseService) { }

	cart = {
		userId: 3,
		date: "2019 - 12 - 10",
		products: [{}]
	}


	async getAllCarts() {
		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT produto.id, nome, image, descricao, preco from produto INNER JOIN produto_carrinho WHERE produto.id = produto_carrinho.id_produto ORDER BY preco;`);
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

	async postToCart(params: any) {
		const db = this.DatabaseService.getConnection();
		console.log(params)
		const [rows] = await db.raw(`INSERT INTO produto_carrinho VALUES(default, 1, ${params});`);
		return rows;

	}


	async removeItemFromCart(params: any) {
		const db = this.DatabaseService.getConnection();
		console.log(params)
		const [rows] = await db.raw(`DELETE FROM produto_carrinho WHERE id_produto = ${params.idProduct}`);
		return rows;
	}


}
