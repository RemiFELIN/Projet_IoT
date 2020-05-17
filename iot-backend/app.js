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

const TOPIC_MICRO = 'myhouse/micro'
const TOPIC_MOUVEMENT = 'myhouse/mouvement'
const TOPIC_LUMIERE = 'myhouse/lumiere'
const TOPIC_GAZ = 'myhouse/gaz'
const TOPIC_TEMP = 'myhouse/temp'

var client = mqtt.connect(mqtt_url, {
    username: 'try',
    password: 'try'
});

// Connexion au topic
client.on('connect', function () {
	client.subscribe(TOPIC_MICRO, function (err) {
		if (!err) {
			console.log('Node Server has subscribed to ', TOPIC_MICRO);
		}
  })
  client.subscribe(TOPIC_MOUVEMENT, function (err) {
		if (!err) {
			console.log('Node Server has subscribed to ', TOPIC_MOUVEMENT);
		}
  })
  client.subscribe(TOPIC_LUMIERE, function (err) {
		if (!err) {
			console.log('Node Server has subscribed to ', TOPIC_LUMIERE);
		}
  })
  client.subscribe(TOPIC_GAZ, function (err) {
		if (!err) {
			console.log('Node Server has subscribed to ', TOPIC_GAZ);
		}
	})
	client.subscribe(TOPIC_TEMP, function (err) {
		if (!err) {
			console.log('Node Server has subscribed to ', TOPIC_TEMP);
		}
	})
});

client.on('message', function (topic, message) {

  console.log(message.toString());
  
  // Parsing du message supposé recu au format JSON
  try{
    if(topic == TOPIC_MICRO || topic == TOPIC_MOUVEMENT || topic == TOPIC_LUMIERE || topic == TOPIC_GAZ || topic == TOPIC_TEMP){
      var res = getMessageFromObject(message);
      if(ifExist(res)) {
        updateValue(res)
      } else {
        addCapteur(res)
      }
    } 
  }
  catch(error){
    //console.log(error)
    //throw error
  }

});

/************************************************** */
/* SECURITE : Algo SHA256 -> décryptage             */
/************************************************** */
var list = [{who: "5E:FF:56:A2:AF:15", value: 1, type: "Capteur senseur"}, 
            {who: "5E:FF:56:A2:AF:41", value: 0.5, type: "Capteur mouvement"}, 
            {who: "5E:FF:56:A2:AF:10", value: 50, type: "Microphone"}, 
            {who: "5E:FF:56:A1:AF:15", value: 11, type: "Capteur thermique"}, 
            {who: "5E:FF:01:A2:AF:15", value: 100, type: "Capteur lumiere"}]

function simulation() {
  var i=0
  while(i<500) {
    var randValue = {who: "E"+ }
  }
}

function testSHA256() {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt('5E:FF:56:A2:AF:15;toto titi tutu', 'miagestic').toString();
    console.log('[testSHA256] Voici la data: ' + ciphertext)
    // Decrypt
    var bytes  = CryptoJS.AES.decrypt(ciphertext, 'miagestic');
    var originalText = bytes.toString(CryptoJS.enc.Utf8)
    console.log('[testSHA256] Voici la data: ' + originalText) // 'my message'
}

// Pour le front !
function getMessageFromObject(data) {
    // Tout d'abord, on décode le message avec notre clé publique
    //var bytes  = CryptoJS.AES.decrypt(data, 'miagestic')
    //var originalText = bytes.toString(CryptoJS.enc.Utf8)
    //console.log('cryptage: ' + originalText)
    originalText = data
    if(originalText.length != 0) {
      // Qui l'a envoyé ? Qu'est ce qu'il a envoyé ?
      // Structure de 'data' : [Adresse MAC];[Value];[Type]
      console.log('get: ' + originalText);
      var res = originalText.split(';')
      var obj = new Object();
      if(res.length == 3) {
        obj.mac = res[0];
        obj.value  = res[1];
        obj.type = res[2];
      } 
      console.log('mon objet de retour: [' + obj.mac + ', ' + obj.value + ', ' + obj.type + ']')
    } else {
      console.log('[WARN] le décryptage a échoué')
    }
    return obj
}

function getList() {
  var tab = new Array();
  list.forEach(element => {
    tab[element.who] = element
  })
  return tab;
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

function updateValue(capteur) {
    list.forEach(element => {
      if(element.who == capteur.who) {
        element.value.push(capteur.value)
      }
    });
}

function ifExist(capteur) {
  var res = false
  list.forEach(element => {
    if (element.who == capteur.who) {
      res = true
    }
  });
  return res
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
    console.log(req.params.mac)
    if (ifExist(req.params.mac)) {
        res.status(200).send('true');
    } else {
        res.status(200).send('false');
    }
})

app.get('/listeCapteurs/:msg', function(req, res) {
    res.send(list);
    //http://localhost:3000/listeCapteurs/U2FsdGVkX1+pBMjv9psDPLaiwCNQX0ROlSJB5r9KFn01pQIv9oXGENfE1+DDb7BhYT3FBQeYywcWjE0jZ5Z9KA==
});

// test : afin de tester les méthodes
testSHA256()
getMessageFromObject(CryptoJS.AES.encrypt('5E:FF:56:A2:AF:15;1;Capteur lumiere', 'miagestic').toString())

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