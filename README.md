
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

  

## Notre projet

Notre projet consiste à un système de maison sécurisé. Notre maison possède des capteurs (capteur de mouvement, capteur de gaz, microphone, capteur de température et capteur de luminosité).

Notre client possède une vue administrateur ou il peut ajouter et supprimer des capteurs et une vue controleur afin de pouvoir déléguer la surveillance de sa maison. Il visualise en temps réel les données des capteurs de sa maison. 

Les envoies des données devaient se faire sous format TLS/SSL mais l'obtention d'un certificat par une autorité étant payante. Nous avons donc crypter nos données au lieu de la couche transport en utilisant une fonction de hachage couplé à un salage (SHA256). Tout ces concepts sont expliqués dans notre document.

Afin de palier aux manques des capteurs nous avons créer une simulation des capteurs avec des données.

