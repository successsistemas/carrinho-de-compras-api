import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import path from 'path';

@Injectable()
export class EmpresasService { 
    getAllEmpresas() {
       
        //pode deixae assim por enquanro, depois vou vê como resolver 
        //na verdade pode até deixar no localhost mesmo
        const absolutepath = path.resolve('./src/empresas/fakeempresas.json')
		const bufferJson:Buffer = readFileSync(absolutepath);
		const empresas = JSON.parse(bufferJson.toString());
		return empresas;
    }
    async findById(id: number) {
        const absolutepath = path.resolve('./src/empresas/fakeempresas.json')
		const bufferJson:Buffer = readFileSync(absolutepath);
		const empresas = JSON.parse(bufferJson.toString());
		const todos = empresas.find((title:any) => title?.id === id);
	
		if (!todos) {
		  throw Error(`Produto com o ID '${id}' não encontrado.`);
		}
	
		return todos;
	  }
}
