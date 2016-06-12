var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');


module.exports = function(){
	var app = express();

	app.use(express.static('./app/public'));
	//Adicionando configuração para o express
	app.set('view engine', 'ejs')
	app.set('views', './app/views');
	
	//Ajustando para que o body-parser faça o parser entre (node <-> html) basicamente.
	// Esta parte se comporta como middleware para alterar as requests, por exenplo[Voce do java, lembre-se dos interceptors].
	app.use(bodyParser.urlencoded({extended:true}));

	//Ajustando para receber dados em JSON. Mais um middleware adicionado. hahaha
	app.use(bodyParser.json());
	
	//Adicionando validação do Express
	app.use(expressValidator());
	
	//Carregamento de modulos a partir do diretorio APP
	load('routes', {cwd: 'app'})
		.then('infra')
		.into(app);
	
	return app;	
}