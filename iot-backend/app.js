var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var CryptoJS = require("crypto-js");

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

var client = mqtt.connect(mqtt_url, {
    username: 'try',
    password: 'try'
});

// Connexion au topic
client.on('connect', function() {
    client.subscribe(TOPIC_BRUIT, function(err) {
        if (!err) {
            console.log('Node Server has subscribed to ', TOPIC_BRUIT);
        }
    })
    client.subscribe(TOPIC_MOUVEMENT, function(err) {
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
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'projet_miagestic');
    var originalText = bytes.toString(CryptoJS.enc.Utf8)
    console.log('Voici la data: ' + originalText) // 'my message'
}

// Pour le front !
function getMessageFromObject(data) {
    // Tout d'abord, on décode le message avec notre clé publique
    var bytes = CryptoJS.AES.decrypt(data, 'projet_miagestic')
    var originalText = bytes.toString(CryptoJS.enc.Utf8)
        // Qui l'a envoyé ? Qu'est ce qu'il a envoyé ?
        // Structure de 'data' : [Adresse MAC];[Value];[Type]
        // On récupère son adresse MAC
    const mac = originalText.substring(0, 17)
        // le message
    const value = originalText.slice(18)
        // On le met dans un objet JSON
    var obj = new Object();
    obj.mac = mac;
    obj.value = value;
    var jsonString = JSON.stringify(obj);
    return jsonString
}

var list = [{ who: "5E:FF:56:A2:AF:15", value: 1, type: "Capteur senseur" },
    { who: "5E:FF:56:A2:AF:41", value: 5, type: "Capteur mouvement" },
    { who: "5E:FF:56:A2:AF:10", value: 50, type: "Microphone" },
    { who: "5E:FF:56:A1:AF:15", value: 11, type: "Capteur thermique" },
    { who: "5E:FF:01:A2:AF:15", value: 100, type: "Capteur lumiere" }
]

function getList() {
    return list;
}

function addCapteur(capteur) {
    list.push(capteur);
}

function removeCapteur(capteur) {
    list.forEach(element => {
        if (element.who == capteur.who) {
            list = list.filter(el => el != element);
        }
    });
}

function ifExist(capteur) {
    list.forEach(element => {
        if (element.who == capteur.who) {
            return true
        }
    });
    return false
}

app.get('/remove/:mac', function(req, res) {
    toRemove = req.params.mac
    console.log(toRemove)
    removeCapteur(toRemove)
    console.log(list)
    res.send(200)
});

app.get('/add/:mac', function(req, res) {
    toAdd = req.params.mac
    console.log(toAdd)
    addCapteur(toAdd)
    console.log(toAdd)
    res.send(200)
})

app.get('/exist/:mac', function(req, res) {
    if (ifExist(req.params.mac)) {
        res.status(200).send('true');
    } else {
        res.status(200).send('false');
    }
})

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