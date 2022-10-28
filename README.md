# P7 Groupomania
#### Parcours développeur Web chez OpenClassRooms

## pré-requis

- NodeJs
- React
- Npm

## Configuration
##### Le projet se compose de deux parties. Une front (client) et une back (server)

###### <u>Back (server)</u>:

1. se rendre dans le dossier server
2. entrer la commande "npm install" dans un terminal

###### <u>Front (client)</u>:

1. se rendre dans le dossier client
2. entrer la commande "npm install" dans un terminal



## Mise en route
###### <u>Back (server)</u>:

1. éditez le fichier .env_sample pour y indiquer vos informations confidentielles
2. Renommez le fichier .env_sample en .env
3. si vous possedez déjà une version de la base de données Groupomania, il sufffit de la placer dans le dossier database.
⚠️ Si aucune base de données n'est présente au lancement de l'application. Le systéme créera une base et définira le compte administrateur en se basant sur les informations contenus dans le fichier .env ⚠️
4. entrer la commande "nodemon start" dans un terminal pour lancer le serveur

###### <u>Front (client)</u>:

1. aller dans le dossier src/apiSetting et renseignez dans le fichier JSON l'adresse du back de l'application. Par défaut l'adresse est : http://localhost:3000 
1. entrer la commande "npm start" dans une terminal pour lancer React. 

* Si un message vous demande de changer de Port, confirmez en tapant Y
