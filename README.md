# Mini_projet_Green_IT - Jeu de Dames

Ce projet permet de jouer au **jeu de dames** sur un plateau de 10x10.
Il gère :
- Les déplacements simples
- Les captures obligatoires
- Les multi-captures
- La promotion en dame
- L'animation fluide des déplacements
- La détection de la fin de partie

## Installation

1. Assurez-vous d'avoir un projet Vue 3 configuré.
2. Copiez le fichier `JeuDames.vue` dans votre dossier `components/`.
3. Importez et utilisez le composant :

```vue
<script>
import JeuDames from '@/components/JeuDames.vue';

export default {
  components: { JeuDames }
}
</script>

<template>
  <JeuDames />
</template>
```

Ou en cliquant sur le lien : [Ajouter un lien](https://www.myefrei.fr/portal/student/home) pour lancer le site web.

## Fonctionnalités

- **Plateau dynamique** : génération automatique des pions blancs et noirs.
- **Système de tour** : blancs et noirs jouent à tour de rôle.
- **Prises obligatoires** : si une capture est possible, elle doit être jouée.
- **Multi-captures** : une pièce doit continuer à capturer si elle peut.
- **Promotion en dame** : lorsqu'un pion atteint la dernière rangée adverse.
- **Animations fluides** : déplacement visuel du pion entre les cases.
- **Détection automatique** de la fin de partie (plus de pions ou plus de coups possibles).

## Personnalisation

- Couleurs du plateau et style des pièces ajustables dans la section `<style scoped>`.
- Messages de statut modifiables dans la méthode `renderBoard()` et `checkGameOver()`.

## À venir

- Support complet de la prise multiple pour les dames.
- Modularisation en plusieurs sous-composants.
- Améliorations UX (sons, surlignage avancé).

## Auteurs
- BRACQUEMART Théo
- DOS SANTOS Thomas
- H'LALI Abdellah
- MIR Driss
- VAZQUEZ Alexandre

---


