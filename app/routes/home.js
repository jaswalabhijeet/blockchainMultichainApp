
module.exports = function(app){
	
	app.get('/', function(req, res){
		var connection = app.infra.connectionFactory;

		connection.getInfo((err, result) => {
			
			if(err){
			
				return next(err);
	    	}	       	 	
			
	    	res.render('home/index', {lista: {}, info: result});
		});
		
	});
	
	
	app.post('/login', function(req, res){
		
		var login = req.body;
		
		
		if(login.perfil == 'AUDITOR'){
			
			res.redirect('/naoconformidade/input');		
		}else if(login.perfil == 'FISCAL'){

			var connection = app.infra.connectionFactory;				
			
			connection.getAddresses({"verbose": true},(err, result) => {
	        	if(err){
	        		return next(err);
	        	}

	        	console.log("Fiscal indo pra listagem do address, result.addres: "+result.address);
	        	
	        	res.redirect('/naoconformidade?address=' + result.address+'&qtdRegistros='+100);		
	    	});  
			
		}
		
	});
}