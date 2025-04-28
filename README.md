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

Assurer d'avoir MangoDB sur votre PC et les plateformes Node et NPM d'installer

1. Dans un terminal de commande rendez-vous dans le backend
2. Entrer la commande "node server.js"
3. Puis dans un second terminal rendez-vous dans le frontend
4. Taper la commande "npm run dev"
5. Enfin ouvrez-vous sur la page http://localhost:5173/

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
