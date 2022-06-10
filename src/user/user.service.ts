import { Body, Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import path from "path";

@Injectable()
export class UserService {

		getAllCarts() {
			const absolutepath = path.resolve('./src/user/fakeuser.json')
			const bufferJson:Buffer = readFileSync(absolutepath);
			const products = JSON.parse(bufferJson.toString());
			return products;
		}

		async findById(id: number) {
			const absolutepath = path.resolve('./src/user/fakeuser.json')
			const bufferJson:Buffer = readFileSync(absolutepath);
			const carts: [] = JSON.parse(bufferJson.toString());
			const todos = carts.find((json:any) => json?.userid === id);
			
		
			if (!todos) {
			  throw Error(`Produto com o ID '${id}' não encontrado.`);
			}
		
			return todos;
		  }
		
	
}

