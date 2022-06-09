/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

@Injectable()
export class EmpresasService { 
    getAllEmpresas() {
        const bufferJson:Buffer = readFileSync('/src/empresas/empresas.json');
		const empresas = JSON.parse(bufferJson.toString());
		return empresas;
    }
}
