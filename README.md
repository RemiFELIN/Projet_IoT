
## Dependances

  

Pour lancer ce projet vous aurez besoin des dernières version de node, npm et angular-cli.

  

Npm et Node: https://nodejs.org/en/download/

  

Angular cli:

```bash

npm install –g typescript@latest

```

  

## Instructions

  

Vous aurez besoin de lancer dans deux terminal le back et le front.

Plus d'instructions dans les dossiers *iot-backend* et *iot-frontend* (readme)

  

## Test du projet

  

Vous devez aller sur l'adresse : [Simulation requête MQTT](http://www.hivemq.com/demos/websocket-client/)
Cliquer sur CONNECTION puis connect. 

Ouvrez l'onglet publish et modifier le topic par myhouse/bruit ou myhouse/mouvement.

Pour envoyez un message :
Entrez un message tel que : {who: "5E:FF:56:A2:AF:15", value: 1, type: "Capteur senseur"}

Choisissez un type de capteur parmis : 
Microphone
Capteur senseur
Capteur mouvement
Capteur thermique
Capteur lumiere

Convertissez votre message en utilisant : [sha256 converter](https://emn178.github.io/online-tools/sha256.html)

Cliquez sur le bouton publish.

