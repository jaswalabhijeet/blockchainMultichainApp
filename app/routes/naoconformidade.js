
module.exports = function(app){
	
	app.get('/naoconformidade', function(req, res, next){
		
		//TODO: tmp
		res.render('naoconformidade/listagem.ejs', {lista: {}});
		
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
	
	app.get('/naoconformidade/input', function(req, res, next){
		var connection = app.infra.connectionFactory;
		
		connection.getAddresses({"verbose": true},(err, result) => {
        	if(err){
        		return next(err);
        	}

        	res.render('naoconformidade/input.ejs', {errosValidacao: {}, naoconformidade: {}, address: result});
    	});  
		
	});
	
	app.post('/naoconformidade', function(req, res, next){
		
		var naoconformidade = req.body;

		//Validações possíveis graças ao express-validator :)
		req.assert('data', 'Data é obrigatória').notEmpty();
		req.assert('address', 'Address é obrigatório').notEmpty();
		
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
		
		var connection = app.infra.connectionFactory;
		
		console.log("Address: "+naoconformidade.address);
		console.log("JSON: "+JSON.stringify(naoconformidade));
		
		connection.sendWithMetadata(
				{"address": naoconformidade.address, "amount": 0, "data": JSON.stringify(naoconformidade)},
				(err, result) => {
			
			console.log("Err: "+err);
			
			console.log("Result: "+result);
			
			if(err){
				return next(err);
        	}
   	 
			res.redirect('/naoconformidade');
        	
		});				
		
	});
}
