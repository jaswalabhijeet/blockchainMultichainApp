
module.exports = function(app){
	
	app.get('/', function(req, res){
		var connection = app.infra.connectionFactory;

		connection.getInfo((err, resultInfo) => {
			
			if(err){
			
				return next(err);
	    	}	       	 	
			
			connection.listAddressTransactions(resultInfo,
					{"address": "15uCL1PGMhfqor9mNpZC21nuFUFrjUGPWpFVu1", "count": 5},
					(err, resultAddress) => {
				
				console.log("listAddressTransactions-Err: "+JSON.stringify(err));
				
				console.log("listAddressTransactions-resultAddress: "+JSON.stringify(resultAddress));
				
				console.log("listAddressTransactions-resultInfo: "+JSON.stringify(resultInfo));
				
				if(err){
					return next(JSON.stringify(err));
	        	}								
				
				res.render('home/index', {lista: resultAddress, info: resultInfo});
	        	
			});	
				    	
		});
		
	});
	
	
	app.post('/login', function(req, res){
		
		var login = req.body;
		
		var connection = app.infra.connectionFactory;				
		
		if(login.perfil == 'AUDITOR'){
			
			res.redirect('/naoconformidade/input');		
		}else if(login.perfil == 'FISCAL'){
			
			res.redirect('/naoconformidade');		
		}
		
	});
}