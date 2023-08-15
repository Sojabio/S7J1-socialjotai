# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# commandes pour faire tourner l'appli

# features
- [x] inscription
- [x] connexion
- [x] déconnexion
- [x] page profil
  - [x] visible si utilisateurice connectée
  - [x] permet à l'utilisateurice de modifier son profil (username et mail)
  - [ ] permet à l'utilisateurice d'ajouter et modifier une description
- [ ] page d'accueil visible par utilisateur connecté
  - [x] input de type texte et bouton d'envoi
  - [x] liste de posts des plus récents aux plus anciens
  - [x] ses propres posts parmi les posts existant
  - [x] le username cliquable de la personne qui a écrit le post redirige vers le profil
- [x] page profil d'une autre utilisateurice affiche liste de ses posts
- [ ] likes et unlikes
- [x] suppression d'un message par son auteurice
- [ ] filtrer les posts pour limiter le nombre de résultats
- [ ] trier les posts par ordre de création
