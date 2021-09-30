# MCube - Test technique Developpeur Fullstack

**Objectif:** Créer une application filmothèque utilisant l'API *Movie Database*.

https://developers.themoviedb.org/3/getting-started/introduction

Vous pouvez facilement vous enregistrer pour créer votre propre API key.

Si vous ne le souhaitez pas, pas de souci voici la notre: **618a4be9da2200266bd65c425369d8e4**


## Mission

Votre application devra contenir:
- un **backend** permettant de gérer les données et d'effectuer les appels sur l'API *Movie Database*
- un **frontend** permettant d'afficher vos données (description du contenu de l'UI ci-après)
- un **repo git** contenant l'ensemble du projet, de quoi l'installer et le démarrer facilement.
<br/>**L'utilisation de Docker est chaudement recommandé. Je suis un peu fainéant, je n'aime pas lancer n terminaux pour tester un projet ;)**

Vous serez évalué sur la partie purement fonctionnelle mais aussi et surtout sur
les choix techniques, l'architecture et l'implémentation (donc aussi la propreté
du code).

Des commits clairs seront appréciés afin d'évaluer votre logique de développement.

Stack imposée :
  - Front: React
  - Back: NodeJS
  - DB: MongoDB


## Contenu de l'application

**Recherche d'un film**:<br/>
Un utilisateur peut rechercher un film et l'ajouter à sa filmothèque.

**Affichage des films dans l'ordre**:<br/>
Un utilisateur peut trier et afficher ses films par:
- date d'ajout
- date de sortie
- nom

**Affichage d'un film sur une autre page**:<br/>
Un utilisateur peut alors voir tout les détails d'un film (vous êtes libre d'afficher le nombre d'informations que vous voulez).

**Affichage des suggestions d'un film:**<br/>
Une fois sur la page de détails, un utilisateur peut voir les suggestions alternative en rapport avec ce film.

**Ajout d'un système de rating:**<br/>
Un utilisateur peut ajouter une note sur chaque film.

