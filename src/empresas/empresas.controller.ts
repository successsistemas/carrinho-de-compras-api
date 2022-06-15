/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { EmpresasService } from './empresas.service';

@Controller('empresas')
export class EmpresasController {
    constructor(private EmpresasService: EmpresasService) {}
    @Get()
	GetAllEmpresas(@Body() body: any, @Query() params:any) {
		const result = this.EmpresasService.getAllEmpresas()
		return result;
	}
	@Get('/:id')
	findProductsById(@Param('id', ParseIntPipe) id:any) {
	  return this.EmpresasService.findById(id).catch((e:any) => {
		throw new NotFoundException(e.message);
	  });
	}
    }

