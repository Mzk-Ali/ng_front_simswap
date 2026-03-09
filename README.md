<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Build Status](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge&logo=github-actions)](https://github.com/Mzk-Ali/ng_front_simswap/actions)
[![Docker Image](https://img.shields.io/badge/Container-GHCR-blue?style=for-the-badge&logo=docker)](https://github.com/Mzk-Ali/ng_front_simswap/pkgs/container/ng_front_simswap)
[![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular)](https://angular.dev/)
[![Node Version](https://img.shields.io/badge/Node-24-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />

| Service | Pipeline CI (Build) | Pipeline CD (Docker) | Image Registre (GHCR) |
| :--- | :---: | :---: | :---: |
| **Frontend** | [![CI Frontend](https://github.com/Mzk-Ali/ng_front_simswap/actions/workflows/ci_ng.yml/badge.svg)](https://github.com/Mzk-Ali/ng_front_simswap/actions) | [![CD Frontend](https://github.com/Mzk-Ali/ng_front_simswap/actions/workflows/cd_ng.yml/badge.svg)](https://github.com/Mzk-Ali/ng_front_simswap/actions) | [![Docker](https://img.shields.io/badge/Pull-Frontend-blue?logo=docker&logoColor=white)](https://github.com/Mzk-Ali/ng_front_simswap/pkgs/container/ng_front_simswap) |



<br />



<div align="center">
  <a href="https://github.com/Mzk-Ali/app_ms_simswap">
    <img src="https://github.com/Mzk-Ali/img_git/blob/main/readMe.jpg" alt="Logo" width="400" height="400">
  </a>

  <h3 align="center">FrontEnd FaceSwap MicroService</h3>

  <p align="center">
    Une solution robuste de permutation de visages propulsée par l'IA.
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#a-propos-du-projet">À propos du projet</a>
      <ul>
        <li><a href="#build-avec">Build avec</a></li>
      </ul>
    </li>
    <li>
      <a href="#commencons">Commençons</a>
      <ul>
        <li><a href="#pré-requis">Pré-requis</a></li>
        <li><a href="#installation">Installation & Lancement</a></li>
      </ul>
    </li>
    <li><a href="#usage">Utilisation</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">DevOps</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>




## À propos du projet

Ce dépôt contient le **microservice Frontend** de l'écosystème **FaceSwap**. Il s'agit de l'interface utilisateur permettant d'interagir avec l'ensemble des services backend pour soumettre des images, suivre les traitements et visualiser les résultats.

L'application est construite avec **Angular 21.0.4** et communique avec le backend via l'**API Gateway** du projet. Elle est servie en production par **Nginx** dans un conteneur Docker multi-stage optimisé.

**Points forts :**

- **Performance :** Build de production optimisé par Angular CLI (tree-shaking, lazy loading).
- **Conteneurisation :** Image Docker légère avec Nginx Alpine, prête pour tout environnement.
- **Sécurité :** Analyse des vulnérabilités Trivy intégrée à la pipeline CI/CD.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Build avec

* [![Angular][Angular]][Angular-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Node][Node]][Node-url]
* [![Nginx][Nginx]][Nginx-url]
* [![Docker][Docker]][Docker-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>


# Commençons

Suivez ces instructions pour configurer le projet dans votre environnement de développement local.

### Pré-requis

- **Docker & Docker Compose** avec Docker Desktop sur Windows (recommandé)
- **Node.js 24** (pour le développement local sans Docker)
- **Angular CLI 21** : `npm install -g @angular/cli`

### Installation & Lancement

#### Via Docker (recommandé)

1. Cloner le projet

```sh
git clone https://github.com/Mzk-Ali/ng_front_simswap.git
cd ng_front_simswap
```

2. Lancer l'application

```sh
docker compose up -d --build
```

3. Accéder à l'application sur `http://localhost:8080`

<br />

#### En local (développement)

1. Cloner le projet

```sh
git clone https://github.com/Mzk-Ali/ng_front_simswap.git
cd ng_front_simswap
```

2. Installer les dépendances

```sh
npm install
```

3. Lancer le serveur de développement

```sh
ng serve
```

4. Accéder à l'application sur `http://localhost:4200`


<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Utilisation

Une fois l'application lancée, l'interface permet de :

- Se connecter / créer un compte via le module d'authentification
- Soumettre des images pour traitement FaceSwap
- Suivre l'état des traitements en temps réel
- Télécharger les images générées par le moteur IA

L'application communique avec le backend via l'**API Gateway** disponible sur `http://localhost:8888`.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

**Core UI & Authentification — Terminé**

- [x] Page d'authentification : Login, Register, gestion des tokens JWT.
- [x] Refresh Token : Renouvellement automatique des sessions.
- [x] Page des gestions de mot de passe : Réinitialisation + Changement de mot de passe
- [x] Routing sécurisé : Guards Angular sur les routes protégées.
- [x] Conteneurisation : Dockerfile multi-stage optimisé (Node → Nginx Alpine).

**DevOps — Terminé**

- [x] **Pipeline CI** : Lint + Build Docker + Scan de sécurité Trivy avec publication SARIF.
- [x] **Pipeline CD** : Build multi-arch Buildx (amd64/arm64) + Push GHCR avec SBOM et attestation SLSA.

**Fonctionnalités IA & Traitement — En cours**

- [x] Interface d'abonnement + redirection vers Stripe pour le paiement
- [x] Interface des factures récupérés via l'API Stripe
- [x] Interface FaceSwap : Interface de soumission et de suivi des traitements.
- [ ] Galerie des résultats : Visualisation et téléchargement des images générées.
- [ ] Intégration S3 : Prévisualisation des rendus stockés dans le cloud.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contact

**Ali MARZAK** — [LinkedIn](https://www.linkedin.com/in/ali-marzak-4ab4c4/) — ali.marzak@live.fr

Project Link : [https://github.com/Mzk-Ali/ng_front_simswap](https://github.com/Mzk-Ali/ng_front_simswap)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & BADGES -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ali-marzak-4ab4c4/
[Angular]: https://img.shields.io/badge/Angular-000000?style=for-the-badge&logo=angular&logoColor=DD0031
[Angular-url]: https://angular.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-000000?style=for-the-badge&logo=typescript&logoColor=3178C6
[TypeScript-url]: https://www.typescriptlang.org/
[Node]: https://img.shields.io/badge/Node.js-000000?style=for-the-badge&logo=nodedotjs&logoColor=339933
[Node-url]: https://nodejs.org/
[Nginx]: https://img.shields.io/badge/Nginx-000000?style=for-the-badge&logo=nginx&logoColor=009639
[Nginx-url]: https://nginx.org/
[Docker]: https://img.shields.io/badge/Docker-000000?style=for-the-badge&logo=docker&logoColor=2496ED
[Docker-url]: https://www.docker.com/
