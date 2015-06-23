// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Time = require('./models/time');

// Conecta no MongoDB
mongoose.connect('mongodb://user:user@ds031531.mongolab.com:31531/times-futebol');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Times de Futebol API' });
});

var timesRoute = router.route('/time');

//Salvar time
timesRoute.post(function(req, res) {
  var time = new Time();

  time.nome = req.body.nome;
  time.pais = req.body.pais;

  time.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Time adicionado com sucesso!', data: time });
  });
});

// Listar Times
timesRoute.get(function(req, res) {
  Time.find(function(err, times) {
    if (err)
      res.send(err);

    res.json(times);
  });
});

// Atualizar time
timesRoute.put(function(req, res) {
  Time.findById(req.params.time_id, function(err, time) {
    if (err)
      res.send(err);

    time.nome = req.body.nome;
    time.pais = req.body.pais;

    time.save(function(err) {
      if (err)
        res.send(err);

      res.json(time);
    });
  });
});

// Deletar time
timesRoute.delete(function(req, res) {
  Time.findByIdAndRemove(req.params.time_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Time removido com sucesso' });
  });
});

// Buscar por ID
var timeRoute = router.route('/time/:time_id');
timeRoute.get(function(req, res) {
  Time.findById(req.params.time_id, function(err, time) {
    if (err)
      res.send(err);
    res.json(time);
  });
});


// Registra a rota
app.use('/api', router);

// Iniciar o servidor
app.listen(port);
console.log('Servidor iniciado na porta' + port);
