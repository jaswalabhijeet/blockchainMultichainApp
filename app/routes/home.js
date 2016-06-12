
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
		
		var connection = app.infra.connectionFactory;
		
		console.log(login);
		
		if(login.perfil == 'AUDITOR'){
			
			res.redirect('/naoconformidade/input');		
		}else if(login.perfil == 'FISCAL'){
			
			res.redirect('/naoconformidade');		
		}
		
	});
}