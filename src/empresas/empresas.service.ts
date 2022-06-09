import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import path from 'path';

@Injectable()
export class EmpresasService { 
    getAllEmpresas() {
        //faz com todos os outros pfv
        
        const absolutepath = path.resolve('./src/empresas/empresas.json')
		const bufferJson:Buffer = readFileSync(absolutepath);
		const empresas = JSON.parse(bufferJson.toString());
		return empresas;
    }
}
