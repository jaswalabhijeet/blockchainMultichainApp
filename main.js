var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var multichain = require("multichain-node")({
	port: 6800,
	host: '127.0.0.1',
	user: 'rodolfo',
	pass: 'qwe123'
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
});

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.htm" );
});

app.get('/add-nao-conformidade', function (req, res) {
	var txt = "Adicionou Nao Confirmidade!";
	console.info(txt);
	res.send(txt);
});

app.get('/ready-nao-conformidade', function (req, res) {
	var txt = "Ready Nao Confirmidade!";
	console.info(txt);
	res.send(txt);
});

//testando comunicacao
app.get('/get-info-json', function (req, res) {   
	
	multichain.getInfo((err, info) => {
       	 
    	if(err){
        	throw err;
    	}
       	 
    	res.send(info);

    	var json = JSON.stringify(info);

    	res.end(json);
               	 
	});    
   
});

app.get('/get-info', function (req, res) {   	 
    
	multichain.getInfo((err, info) => {
        	if(err){
            	throw err;
        	}
       	 
        	res.send(info);               	 
    	});    
   
});

// Mensagens de um determinado endereco[SIMULANDO NAO CONFORMIDADES EMITIDAS NA NORTE ENERGIA]
app.get('/list-address-transactions',
    
    function (req, res) {
   	 
   	 multichain.listAddressTransactions( {"address": "1GyrdJoPgsrqGvm3PGwJ2L5kLVizhuf4oRCsvd"},
   		 (err, info) => {
           	 
   	 	if(err){
                	throw err;
            	}
       	 
            	res.send(info);               	 
        	});    
   
    });

//RECUPERA ADDRESSES
app.get('/get-addresses',

    function (req, res) {   	 
    
    	multichain.getAddresses({"verbose": true},(err, info) => {
            	if(err){
                	throw err;
            	}
       	 
            	res.send(info);               	 
        	});    
   
    });


app.post('/send-with-metadata', urlencodedParser, function (req, res) {


	console.info(req.body.combo_ocorrencia);
      
    
	/*multichain.sendWithMetadata({address: '1GyrdJoPgsrqGvm3PGwJ2L5kLVizhuf4oRCsvd', amount: "0", data: req.body.combo_ocorrencia}, (err, info) => {
        	if(err){
            	throw err;
        	}
       	 
        	console.info(info);               	 
    	});	*/

    res.sendFile( __dirname + "/public/" + "index.htm" );
   
});

var server = app.listen(8181, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log("Aplicacao escutando em http://%s:%s", host, port);

});

