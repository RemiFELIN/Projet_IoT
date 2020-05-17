var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Importation des modules
var path = require('path');
const socketio = require('socket.io');

const mqtt = require('mqtt')

const mqtt_url = 'http://broker.hivemq.com'
// Les topics :
const TOPIC_BRUIT = 'myhouse/bruit'
const TOPIC_MOUVEMENT = 'myhouse/mouvement'

var client  = mqtt.connect(mqtt_url,{
  username: 'try',
  password: 'try'
});

// Connexion au topic
client.on('connect', function () {
	client.subscribe(TOPIC_BRUIT, function (err) {
		if (!err) {
			//client.publish(TOPIC_BRUIT, 'Hello mqtt')
			console.log('Node Server has subscribed to ', TOPIC_BRUIT);
		}
	})
	client.subscribe(TOPIC_MOUVEMENT, function (err) {
		if (!err) {
			//client.publish(TOPIC_MOUVEMENT, 'Hello mqtt')
			console.log('Node Server has subscribed to ', TOPIC_MOUVEMENT);
		}
	})
});

/*client.on('message', function (topic, message) {
	console.log("MQTT msg on topic : ", topic.toString());
	console.log("Msg payload : ", message.toString());
	//{who: 30:AE:A4:8F:3D:20, value: ping off}
	console.log(message.toString());

	try{
		message = JSON.parse(message);
		wh = message.who
		val = message.value
		if(topic == 'sensors/ping'){
			io.emit('pingOff', {
				who: wh,
				value: val
			});
        }
	}
	catch(error){
		//console.log(error)
		//throw error
	}
				
});*/

app.get('/toto', function (req, res) {
    req.send('ouig');
});

module.exports = app;

// Le moyen de fournir les données avec la solution SSL/TLS (Source: hivemq.com)
/*
var mqtt = require('mqtt');
var fs = require('fs');
var KEY = __dirname + '/tls-key.pem';
var CERT = __dirname + '/tls-cert.pem';
var TRUSTED_CA_LIST = [__dirname + '/crt.ca.cg.pem'];

var PORT = 1883;
var HOST = 'stark';

var options = {
  port: PORT,
  host: HOST,
  keyPath: KEY,
  certPath: CERT,
  rejectUnauthorized : true, 
  //The CA list will be used to determine if server is authorized
  ca: TRUSTED_CA_LIST
};

var client = mqtt.connect(options);

client.subscribe('messages');
client.publish('messages', 'Current time is: ' + new Date());
client.on('message', function(topic, message) {
  console.log(message);
});

client.on('connect', function(){
	console.log('Connected');
});
*/