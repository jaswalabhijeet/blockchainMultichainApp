
module.exports = function(app){
	
	app.get('/', function(req, res){
		var connection = app.infra.connectionFactory;

		connection.getInfo((err, info) => {
			
			if(err){
			
				return next(err);
	    	}
	       	 
	    	res.send(info);

	    	var json = JSON.stringify(info);

	    	res.render('home/index', {lista: {}, info: json});
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