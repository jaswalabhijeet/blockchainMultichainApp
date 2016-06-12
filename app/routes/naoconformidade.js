
module.exports = function(app){
	
	app.get('/naoconformidade', function(req, res, next){
		
		//TODO: tmp
		res.render('naoconformidade/listagem.ejs', {lista: results});
		
		//Possivel, pois o express-load carregou esta dependencia no arquivo express.js
//		var connection = app.infra.connectionFactory;
//		var dao = new app.infra.NaoconformidadeDAO(connection);
//		
//		dao.listar(function(err, results){
//			
//			if(err){
//				return next(err);
//			}
//			
//			res.format({
//				html: function(){					 
//					res.render('naoconformidade/listagem.ejs', {lista: results});
//				},
//				json: function(){
//					res.json(results);
//				}
//			});
//		});
//		
//		connection.end();
	});	
	
	app.get('/naoconformidade/input', function(req, res){
		
		res.render('naoconformidade/input.ejs', {errosValidacao: {}, naoconformidade: {}});
	});
	
	app.post('/naoconformidade', function(req, res){
		
		var naoconformidade = req.body;

		//Validações possíveis graças ao express-validator :)
		req.assert('data', 'Data é obrigatória').notEmpty();
		
		var erros = req.validationErrors();
		
		if(erros){
			res.format({
				html: function(){					 
					res.status(400).render('naoconformidade/input', 
							{errosValidacao: erros, naoconformidade: naoconformidade});
				},
				json: function(){
					res.status(400).json(erros);
				}
			});

			return;
		}
		
		//TODO: tmp
		res.redirect('/naoconformidade');
//		var connection = app.infra.connectionFactory;
//	 
//		var dao = new app.infra.NaoconformidadeDAO(connection);
//		
//		dao.salvar(naoconformidade, function(err, results){
//			res.redirect('/naoconformidade');		
//		});
	});
}
