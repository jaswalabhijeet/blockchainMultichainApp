var express = require('../config/express')();
var request = require('supertest')(express);

process.env.NODE_ENV = 'test';

describe('#NaoconformidadeController', function() {

	/*
	 * Limpando a base de dados sempre antes de executar qualquer teste, para
	 * evitar sujeira de teste
	 */
	beforeEach(function(done) {
		var conn = express.infra.connectionFactory();
		conn.query('delete from ocorrencia', function(ex, result) {
			if (!ex) {
				done();
			}
		});
	});

	/*
	 * Limpando a base de dados sempre depois de executar qualquer teste, para
	 * evitar sujeira de teste[Pesquise node-database-cleaner para limpar várias
	 * tabelas de forma facilitada.]
	 * 
	 */
	afterEach(function(done) {
		var conn = express.infra.connectionFactory();
		conn.query('delete from ocorrencia', function(ex, result) {
			if (!ex) {
				done();
			}
		});
	});

	it('#listagem json', function(done) {
		request.get('/naoconformidade').set('Accept', 'application/json')
				.expect('Content-Type', /json/).expect(200, done);

	});

	it('#cadastro de nao conformidade com dados invalidos', function(done) {
		request.post('/naoconformidade').send({
			data : '',
			descricao : 'Falta de uso do capacete'
		}).expect(400, done);
	});

	it('#cadastro de nao conformidade com dados validos', function(done) {
		request.post('/naoconformidade').send({
			data : '2016-06-12 14:16:00',
			descricao : 'Falta de uso do capacete'
		}).expect(302, done);
	});

});