# Metrology OS

GMAO métrologique autonome en HTML : parc instruments, procédures, étalonnages, périodicités, incertitudes, certificats, conformité, référentiels et recherche.

## Version
Metrology OS V4 — base multi-domaines avec procédures maîtrisées et recherche intégrée au tableau des instruments.

## Utilisation
Ouvrir `index.html` dans un navigateur moderne.

## Référentiels
Les références normatives sont identifiées et reliées à leurs sources officielles quand disponibles. Les textes complets des normes protégées (ISO, IEC, AFNOR, RCC-M/AFCEN, etc.) ne sont pas redistribués ; leur consultation reste soumise aux droits/licences applicables.

## Données
Le prototype fonctionne principalement côté navigateur. Pour une utilisation industrielle multi-utilisateur, prévoir une base de données, authentification, sauvegardes, gestion des rôles et veille normative serveur.


## Démarrage et périmètre

**Thème : industrie · métrologie · gestion des équipements.** Aucun installateur n'est nécessaire pour l'interface actuelle : ouvrir `index.html` ou lancer `python3 -m http.server 8000` dans le dossier du projet, puis visiter http://localhost:8000/.

Cette interface vise une **démonstration de méthodes de suivi**, pas la production d'un certificat d'étalonnage accrédité. Les résultats et décisions de conformité doivent être confirmés par une procédure maîtrisée, des équipements étalonnés et des personnes compétentes. Les références aux normes ne constituent pas une certification ISO ni une autorisation de redistribution de leurs textes.

## Points à valider pour une mise en production

- Traçabilité des mesures, des versions de procédures et des décisions.
- Sauvegardes, gestion des rôles et journal d'audit immuable.
- Tests de calculs d'incertitude avec cas de référence validés.
- Contrôles d'accessibilité et essais multi-navigateurs.

**Statut :** prototype navigateur ; aucune qualification métrologique ou mise en production n'est attestée par ce README.

[Catalogue des projets Studio Niko Design](https://github.com/Nikoju1977).


## Utilisation et vérifications

Le dépôt contient une application autonome en `index.html`. Pour la consulter dans un navigateur moderne, ouvrir ce fichier ou démarrer un serveur local :

```bash
python3 -m http.server 8000
```

Puis accéder à http://localhost:8000/.

**Avant un déploiement professionnel :** inventorier les données enregistrées par l'interface, vérifier leur sauvegarde et leur restauration, définir les profils d'accès, valider les calculs d'incertitude sur des cas de référence et conserver la traçabilité des procédures appliquées. Une interface de métrologie ne constitue pas à elle seule une preuve de conformité à un référentiel ISO.

**Maturité :** prototype ; aucun audit de certification, contrôle métrologique indépendant ni test navigateur n'est revendiqué ici.

[Voir les autres projets Studio Niko Design](https://github.com/Nikoju1977).
