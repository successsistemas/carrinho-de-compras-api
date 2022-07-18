import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/api-database.service copy';

@Injectable()
export class EmpresasService {
	constructor(private DatabaseService: DatabaseService) { }
	async getAllEmpresas() {

		const db = this.DatabaseService.getConnection();
		const [rows] = await db.raw(`SELECT empresa.id, title, description, image, cnpj, sponor, phone FROM empresa INNER JOIN usuario WHERE usuario.id= 1 ORDER BY title`);
		return rows;
	}
	
}
