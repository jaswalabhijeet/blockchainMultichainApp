
module.exports = function(app){
	
	app.get('/naoconformidade', function(req, res, next){
		
		var connection = app.infra.connectionFactory;
		
		var addressParam = req.query.address;

		var qtdRegistros = req.query.qtdRegistros;
		console.log(addressParam +" || "+qtdRegistros);

		//["address", {"count": 10}, {"skip": 0}, {"verbose": false}]
		
		connection.listAddressTransactions(
				{"address": addressParam, "count": parseInt(qtdRegistros)},
				(err, result) => {
			
			console.log("listAddressTransactions-Err: "+JSON.stringify(err));
			
			console.log("listAddressTransactions-Result: "+JSON.stringify(result));
			
			if(err){
				return next(err);
        	}
			
			res.render('naoconformidade/listagem.ejs', {lista: {}});
        	
		});	
		
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
		
		console.log("sendWithMetadata-Address: "+naoconformidade.address);
		console.log("sendWithMetadata-JSON: "+JSON.stringify(naoconformidade));
		
		connection.sendWithMetadata(
				{"address": naoconformidade.address, "amount": 0, "data": JSON.stringify(naoconformidade)},
				(err, result) => {
			
			console.log("Err: "+err);
			
			console.log("Result: "+result);
			
			if(err){
				return next(err);
        	}
   	 
			res.redirect('/naoconformidade?address=' + naoconformidade.address+'&qtdRegistros='+100);
        	
		});				
		
	});
}
