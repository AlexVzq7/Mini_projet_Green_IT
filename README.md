# Mini_projet_Green_IT - Jeu de Dames

Ce projet permet de jouer au **jeu de dames** sur un plateau de 10x10.
Il gère :

-  Les déplacements simples
-  Les captures obligatoires
-  Les multi-captures
-  La promotion en dame
-  L'animation fluide des déplacements
-  La détection de la fin de partie

## Installation

Assurer d'avoir MongoDB sur votre PC et les plateformes Node et NPM d'installer

1. Cloner le projet avec la commande 'git clone https://github.com/AlexVzq7/Mini_projet_Green_IT.git'
2. Puis ouvrez MongoDB créez une base de données "green-it" et connectez vous y.
3. Dans un terminal de commande rendez-vous dans le backend
4. Entrer la commande "node server.js"
5. Puis dans un second terminal rendez-vous dans le frontend
6. Taper la commande "npm run dev"
7. Enfin ouvrez la page http://localhost:5173/

Ou alors connectez au site en ligne en cliquant sur le [lien](https://frontend-2-sand.vercel.app/)

## Fonctionnalités

-  **Plateau dynamique** : génération automatique des pions blancs et noirs.
-  **Système de tour** : blancs et noirs jouent à tour de rôle.
-  **Prises obligatoires** : si une capture est possible, elle doit être jouée.
-  **Multi-captures** : une pièce doit continuer à capturer si elle peut.
-  **Promotion en dame** : lorsqu'un pion atteint la dernière rangée adverse.
-  **Animations fluides** : déplacement visuel du pion entre les cases.
-  **Détection automatique** de la fin de partie (plus de pions ou plus de coups possibles).

## Personnalisation

-  Couleurs du plateau et style des pièces ajustables dans la section `<style scoped>`.
-  Messages de statut modifiables dans la méthode `renderBoard()` et `checkGameOver()`.

## À venir

-  Support complet de la prise multiple pour les dames.
-  Modularisation en plusieurs sous-composants.
-  Améliorations UX (sons, surlignage avancé).

## Auteurs

-  BRACQUEMART Théo
-  DOS SANTOS Thomas
-  H'LALI Abdellah
-  MIR Driss
-  VAZQUEZ Alexandre

---
