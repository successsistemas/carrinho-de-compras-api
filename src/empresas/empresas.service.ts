import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import path from 'path';
import { DatabaseService } from 'src/database/api-database.service copy';

@Injectable()
export class EmpresasService {
	constructor(private DatabaseService: DatabaseService) { }
	async getAllEmpresas() {

		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT empresa.id, title, description, image, cnpj, sponor FROM usuario INNER JOIN usuario_has_empresa ON usuario_has_empresa.usuario_id = usuario.id INNER JOIN empresa ON empresa.id = empresa_id WHERE usuario.id = 1`);
		return rows;
	}
	async findById(id: number) {
		const absolutepath = path.resolve('./src/empresas/empresas.json')
		const bufferJson: Buffer = readFileSync(absolutepath);
		const empresas = JSON.parse(bufferJson.toString());
		const todos = empresas.find((title: any) => title?.id === id);

		if (!todos) {
			throw Error(`Produto com o ID '${id}' não encontrado.`);
		}

		return todos;
	}
}
