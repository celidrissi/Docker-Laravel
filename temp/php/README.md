# Gestion de modules IOT


## Description
Depuis plusieurs années, les objets connectés à internet se multiplient, cependant les outils pour vérifier leur fonctionnement et leur disponibilité restent rares. Le sujet de ce test est le développement d’un site web de monitoring de modules IOT.


## Tâches à réaliser
- Création d’une interface de visualisation de l’état de fonctionnement des modules.
- Création d’une BDD répertoriant les modules, leurs détails et l’historique de fonctionnement.
- Création d’un formulaire, pour inscrire de nouveaux modules à savoir :
   - 1ère partie : Nom du modules, numéro, description, type, etc.
   - 2ème partie : Informations à afficher sous forme de liste à choix multiple (température, durée de fonctionnement, nombre de données envoyées, état de marche, etc)
- Sur l’interface, des notifications visuelles en cas de dysfonctionnement d’une variable d’un module. 
- Création d’un script de génération automatique d’état des modules, pour une simulation réussie.


## Fonctionnalitées
- Visualiser la liste des modules
- Obtenir toutes les informations sur un module en particulier
- Possibilité de choisir quelles informations on souhaite rendre visible sur le détail du module
- Ajouter un module
- Rechercher un module en fonction de son nom
- Voir l'historique des éventuels disfonctionnements des modules
- Marquer une entrée de l'historique comme "lue" pour qu'elle ne soit pas compter dans le nombre de problèmes 
- Envoi d'une notification lorsqu'un module devient déféctueux (simulation via un bouton)
- Affichage du nombre de problèmes que l'on a pas encore vu
- Avoir un rapport simple et concis du fonctionnement de l'ensemble des modules (via la commande ``php artisan modules:analyze``)


## Technologies utilisées
- Back End : PHP 7.4 avec Laravel 6 (https://laravel.com/)
- Front End : React.js 16 (https://reactjs.org/) & Bootstrap 4 (https://getbootstrap.com/)

##  Installation du projet
1. Cloner le dépôt
2. Lancer les commandes ``composer install`` & ``yarn`` (ou ``npm`` suivant vos préférences) pour télécharger les dépendances PHP & Javascript
3. Lancer la commande ``yarn dev`` (ou ``npm run dev``) pour compiler les styles et le javascript
4. Copier le fichier ``.env.example`` en ``.env`` (ou renommez-le) & modifiez les informations de la base de données (DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE)
5. Lancer la commande ``php artisan migrate`` pour créer les tables dans la base de données
6. (Optionnel) Lancer la commande ``php artisan db:seed`` pour générer des données aléatoires afin de pouvoir tester l'application avec un minimum de contenu
7. Taper la commande ``php artisan key:generate`` pour générer une clé aléatoire
8. Lancer la commande ```php artisan serve``` pour lancer le serveur
9. Ouvrez la page ``127.0.0.1:8000`` dans votre navigateur préféré & admirez
