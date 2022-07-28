import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedidos.service';

@Controller('pedido')
export class PedidosController {
	constructor(private pedidoService: PedidoService) { }
	@Get('todos')
	getPedido(@Query('id-usuario') nome: number) {
		this.pedidoService.getPedidos();
	}
	@Get('itens')
	getItensPedido() {
		return this.pedidoService.getItensPedido();
	}
	@Post()
	criarPedido(@Body() body: any) {
		return this.pedidoService.confirmarPedido(body);
	}
	@Patch()
	atualizarPedido() {
		this.atualizarPedido();
	}


}