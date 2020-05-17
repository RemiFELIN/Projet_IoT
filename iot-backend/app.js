var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var CryptoJS = require("crypto-js");

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

const mqtt = require('mqtt')

const mqtt_url = 'http://broker.hivemq.com'
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
			console.log('Node Server has subscribed to ', TOPIC_BRUIT);
		}
	})
	client.subscribe(TOPIC_MOUVEMENT, function (err) {
		if (!err) {
			console.log('Node Server has subscribed to ', TOPIC_MOUVEMENT);
		}
	})
});

/************************************************** */
/* SECURITE : Algo SHA256 -> décryptage             */
/************************************************** */

function testSHA256() {
    var ciphertext = CryptoJS.AES.encrypt('5E:FF:56:A2:AF:15;toto titi tutu', 'projet_miagestic').toString();
    console.log('Voici la data: ' + ciphertext)
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'projet_miagestic');
    var originalText = bytes.toString(CryptoJS.enc.Utf8)
    console.log('Voici la data: ' + originalText) // 'my message'
}

// Pour le front !
function getMessageFromObject(data) {
    // Tout d'abord, on décode le message avec notre clé publique
    var bytes  = CryptoJS.AES.decrypt(data, 'projet_miagestic')
    var originalText = bytes.toString(CryptoJS.enc.Utf8)
    // Qui l'a envoyé ? Qu'est ce qu'il a envoyé ?
    // Structure de 'data' : [Adresse MAC];[Value]
    // On récupère son adresse MAC
    const mac = originalText.substring(0,17)
    // et le message
    const value = originalText.slice(18)
    // On le met dans un objet JSON
    var obj = new Object();
    obj.mac = mac;
    obj.value  = value;
    var jsonString= JSON.stringify(obj);
    console.log(jsonString)
}

app.get('/listeCapteurs/:msg', function(req, res) {
    res.send(getMessageFromObject(req.params.msg))
    //http://localhost:3000/listeCapteurs/U2FsdGVkX1+pBMjv9psDPLaiwCNQX0ROlSJB5r9KFn01pQIv9oXGENfE1+DDb7BhYT3FBQeYywcWjE0jZ5Z9KA==
});

// test : afin de tester les méthodes
testSHA256()
getMessageFromObject(CryptoJS.AES.encrypt('5E:FF:56:A2:AF:15;toto titi tutu', 'projet_miagestic').toString())

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