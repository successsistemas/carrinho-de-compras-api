
import { Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedidos.service';

@Controller('pedido')
export class PedidosController {
	constructor(private pedidoService: PedidoService) { }
	@Get('todos')
	getPedido(@Query('id-usuario') nome: number) {
		console.log(nome)
		this.pedidoService.getPedidos();
	}
	@Get('itens')
	getItensPedido() {
		return this.pedidoService.getItensPedido();
	}
	@Post()
	criarPedido() {

	}
	@Patch()
	atualizarPedido() {
		this.atualizarPedido();
	}
}
