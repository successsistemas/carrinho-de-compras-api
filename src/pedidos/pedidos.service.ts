import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/api-database.service copy';

@Injectable()
export class PedidoService {
	constructor(public databaseService: DatabaseService) { }


	getPedidos() {
		const knext = this.databaseService.getConnection();
		knext.transaction(function (trx) {
			const r = knext('pedido').transacting(trx);

			r.insert({ id_pedido: knext.raw("default"), usuario_id: 1, empresa_id: 3, status_pedido: 2, created_at: knext.raw("CURRENT_TIME()"), updated_at: null })
			r.insert({ id_pedido: knext.raw("default"), usuario_id: 1, empresa_id: 2, status_pedido: 1, created_at: knext.raw("CURRENT_TIME()"), updated_at: null })
			r.then(trx.commit)
				.catch(trx.rollback);
		}).then(function (resp) {
			console.log('Transaction complete.');
		}).catch(function (err) {
			console.error(err);
		});
	}
	async getItensPedido() {
		const knext = this.databaseService.getConnection();
		const [itensDoPedido] = await knext.raw(`SELECT A.id_pedido, A.usuario_id, A.empresa_id, A.status_pedido, DATE_FORMAT(created_at, " %d/%m/%y") AS data_pedido,  TIME_FORMAT(created_at, "%H:%i:%s") AS hora_pedido, A.updated_at, A.valor_total, A.forma_pagamento FROM pedidos AS A order by created_at DESC`
			// `
			// 		SELECT 
			// 		A.id_pedido,
			// 		A.usuario_id,
			// 		A.empresa_id,
			// 		A.status_pedido,
			// 		A.created_at,
			// 		A.updated_at,
			// 		C.nome AS nome_produto,
			// 		B.quantidade_produto,
			// 		C.image AS image_produto,
			// 		C.descricao AS descricao_produto,
			// 		C.preco AS preco_produto,
			// 		D.title AS nome_empresa
			// FROM
			// 		pedido AS A
			// 				INNER JOIN
			// 		produto_pedido AS B ON A.id_pedido = B.fk_pedido
			// 				INNER JOIN
			// 		produto AS C ON C.id = B.FK_Produto
			// 				INNER JOIN
			// 		empresa AS D ON A.empresa_id = D.id
			// WHERE
			// 		A.usuario_id = 1;
			// `
		)
		return itensDoPedido;
	}
	async confirmarPedido(body:any) {
		const db = this.databaseService.getConnection();
		
		const [rows] = await db.raw(`INSERT INTO pedidos (usuario_id, empresa_id, status_pedido, valor_total, forma_pagamento) VALUES(1, 1, 1, ${body.somaitens}, '${body.paymentmethod}')`);
		return rows;
		
	}

}