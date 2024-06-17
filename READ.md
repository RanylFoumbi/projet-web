# 👨🏼‍🤝‍👨🏼 Participants
  - FOUMBI DJOMO Ranyl Josué
  - MANFO JIENGAP Rosvalde Florient

# `Étude de faisabilité`

# 1. NestJS

`Fonctionnement` : NestJS est un framework Node.js qui permet de construire des applications backend efficaces et évolutives. Il utilise du JavaScript progressif, est entièrement compatible avec TypeScript et combine des éléments de la programmation orientée objet (OOP), de la programmation fonctionnelle (FP) et de la programmation réactive fonctionnelle (FRP).

`Installation` : Avant toute chose, nous avons besoin de quelques prérequis :
 - NodeJS 16 >,
 - NPM,
 - Visual Studio Code (VS) ou autre (à vous de choisir !)

Vous pouvez créer un nouveau projet avec le Nest CLI en utilisant la commande suivante :

> $ npm i -g @nestjs/cli       

> $ nest new nom-du-projet

La CLI va créer pour nous un nouveau projet dans le dossier nom-du-projet :

`src` : contient notre future application.   
`test` : contient les tests End to End.

La commande pour démarrer le projet est la suivante:   
 `next start`
et le serveur sera dispoible dans le navigateur via l'url `http://localhost:3000`

`Architecture modulaire`   
**Nest** se veut très fortement inspiré du framework Angular. Une application Nest est ainsi, comme Angular, découpable en modules. Chaque module gère, de façon isolée, l’ensemble des actions propres à une partie métier. Dans le cas d’API REST, un module permet de définir un endpoint. Pour cela, il est constitué de `services` et de `controllers`. Les controllers définissent le routage des endpoints et les services permettent d’aller chercher la donnée. 

Si on reprend l’exemple de la documentation de Nest, on a ci-dessous un controller qui définit le endpoint cats et qui gère toutes les routes correspondantes aux chats. Ici la route GET /api/cats nous permet de récupérer l’ensemble des chats.
![alt text](/assets/image.png)

Une fois appelée la route peut aller, via le service cats, chercher la donnée correspondant à l’endpoint.
![alt text](/assets/image-1.png)

Cette isolation en modules permet ainsi de réutiliser plus facilement le code d’un projet à un autre, ce qui peut pour des fonctions métiers communes à plusieurs projets vous faire économiser un temps précieux.

De plus, pour ne pas réinventer la roue à chaque projet, Nest met à disposition des composants qui pourront vous faire gagner en productivité. Ces composants permettent de se concentrer sur les vraies fonctionnalités à valeur ajoutée pour vos clients.

On retrouve par exemple :

- **Les pipes** qui vous permettent de transformer ou de valider de la donnée d’entrée dans le endpoint. Cela permet de valider facilement vos arguments et queries.

- **Les interceptors** permettent de modifier les requêtes d’entrée ou de sortie d’un contrôleur pour, par exemple, transformer une exception renvoyée.

- **Les guards** qui sont appelés à l’entrée de l’application et qui déterminent si la requête est valide. Si elle ne l’est pas le guard renvoie une erreur 403 (Forbidden). Cela peut notamment servir à construire le système d'authentification de votre application.

# 2. GraphQL
`Intérêt` : GraphQL est un langage de requête flexible pour les APIs. Il permet de récupérer exactement les données dont vous avez besoin, évitant ainsi le surchargement d’informations inutiles.

`Avantages` :
- **Flexibilité** : Vous définissez les données à récupérer dans la requête.
- **Réduction du nombre d’appels API** : Une seule requête peut récupérer plusieurs types de données.
- **Auto-documentation** : Les schémas GraphQL sont auto-documentés.

`Inconvénients` :
- **Courbe d’apprentissage** : Comprendre le modèle de requête GraphQL peut nécessiter un temps d’adaptation.
- **Sécurité** : Une mauvaise configuration peut exposer des données sensibles.

# 3. Mixer Nest avec GraphQL et REDIS :

Cette combinaison peut être pertinente pour les raisons suivantes :
- **Performance** : GraphQL permet de récupérer uniquement les données nécessaires, ce qui peut améliorer les performances.
- **Flexibilité** : Vous pouvez ajouter ou modifier des champs sans impacter les clients existants.
- **Scalabilité** : REDIS, utilisé pour la mise en cache, peut améliorer la scalabilité de l’application et haute disponibilité des données.

