<template>
    <div>
      <!-- Header -->
      <header>
        <h1>Bienvenue sur le Jeu de Dames Écologique</h1>
        <p>Un jeu divertissant avec un impact environnemental minimal</p>
      </header>
  
      <!-- Main Content -->
      <div class="container">
        <!-- Introduction -->
        <div class="section">
          <h2>Pourquoi choisir notre version numérique du jeu de dames ?</h2>
          <p>
            Notre jeu de dames en ligne présente de nombreux avantages écologiques, permettant de
            réduire l'empreinte carbone par rapport aux jeux physiques traditionnels. Découvrez ci-dessous les raisons pour lesquelles vous pouvez jouer en toute conscience
            écologique :
          </p>
        </div>
  
        <!-- Advantages Section -->
        <div class="section">
          <h2>Les avantages écologiques de notre jeu de dames numérique</h2>
          <div class="advantages">
            <div class="advantage">
              <h3>1. Réduction des déchets physiques</h3>
              <p>
                Les jeux de société traditionnels nécessitent des matériaux comme le plastique,
                le carton et le papier pour fabriquer le plateau, les pions, les boîtes et les
                règles. En jouant à notre version numérique, vous contribuez à réduire la
                demande de ces matériaux et à limiter les déchets générés.
              </p>
            </div>
            <div class="advantage">
              <h3>2. Moins de ressources naturelles utilisées</h3>
              <p>
                La production de jeux physiques nécessite l'extraction et la transformation de
                ressources naturelles telles que le bois, le pétrole et le coton. En optant
                pour un jeu numérique, vous économisez ces ressources précieuses et réduisez la
                pression exercée sur notre planète.
              </p>
            </div>
            <div class="advantage">
              <h3>3. Aucune émission liée au transport</h3>
              <p>
                Les jeux physiques sont produits, stockés et expédiés, ce qui implique une
                consommation d'énergie importante et des émissions de CO2 liées au transport.
                Notre jeu numérique élimine complètement cette étape, contribuant ainsi à un
                impact environnemental réduit.
              </p>
            </div>
            <div class="advantage">
              <h3>4. Durabilité et conservation</h3>
              <p>
                Un jeu de dames numérique ne s'use pas avec le temps comme un jeu physique.
                Vous pouvez y jouer à l'infini sans avoir à vous soucier de son usure. Il n'y a
                donc pas de remplacement nécessaire, ce qui réduit les déchets à long terme.
              </p>
            </div>
            <div class="advantage">
              <h3>5. Accessibilité sans impact supplémentaire</h3>
              <p>
                Un jeu numérique ne nécessite pas de nouveaux achats de matériel physique à
                chaque partie. De plus, il est accessible à tous grâce aux appareils
                électroniques courants (ordinateurs, tablettes, téléphones), ce qui signifie
                que vous pouvez jouer sans avoir à vous déplacer ni à utiliser des ressources
                supplémentaires.
              </p>
            </div>
            <div class="advantage">
              <h3>6. Mesures écologiques du site</h3>
              <p>
                Un jeu très peu gourmand en requêtes entre client et serveur. L'optimisation
                pour accéder à la base de données permet de récupérer seulement les
                informations utiles et réduit le stockage en mémoire de renseignements
                superflus. Les connexions sont persistantes pour minimiser la consommation
                d'énergie lors de l'accès à la base de données. Lorsque l'utilisateur crée un
                compte, il est directement connecté sans devoir saisir une nouvelle fois son
                nom et mot de passe évitant plusieurs requêtes.
              </p>
            </div>
          </div>
        </div>
  
        <!-- Le Saviez-vous -->
        <div class="section">
          <h2>Le saviez-vous ?</h2>
          <p>
            En moyenne, un site web produit 4.61 grammes de CO2 par page vue. Pour les sites web
            qui ont une moyenne de 10 000 pages vues par mois, cela représente 553 kilogrammes de
            CO2 par an.
          </p>
        </div>
  
        <!-- Conclusion -->
        <div class="section">
          <h2>Joignez-vous à nous pour un futur plus vert !</h2>
          <p>
            En choisissant notre jeu de dames numérique, vous faites un geste pour la planète.
            Amusez-vous tout en participant activement à la préservation de l'environnement.
          </p>
        </div>
      </div>
  
      <!-- Footer -->
      <footer>
        <p>
          &copy; 2025 Jeu de Dames Écologique - Tous droits réservés<br />
          BRACQUEMART Théo - DOS SANTOS Thomas - H'LALI Abdellah - MIR Driss - VAZQUEZ Alexandre
        </p>
      </footer>
    </div>
  </template>
  
  <script setup>
  // Pas de logique JS ici pour cette page statique.
  // Si tu utilises Vue Router, remplace le bouton par <router-link to="/jeu">Vers le jeu</router-link>
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f7f7f7;
    color: #333;
  }
  header {
    background-color: #2d6a4f;
    color: white;
    padding: 20px;
    text-align: center;
  }
  header h1 {
    font-size: 2.5em;
    margin: 0;
  }
  header p {
    font-size: 1.2em;
  }
  
  /* Style du contenu principal */
  .container {
    padding: 40px;
    max-width: 1100px;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  .section {
    margin-bottom: 40px;
  }
  .section h2 {
    font-size: 2em;
    color: #2d6a4f;
    margin-bottom: 10px;
  }
  .section p {
    font-size: 1.1em;
    line-height: 1.6;
  }
  
  /* Style des avantages */
  .advantages {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  .advantage {
    background-color: #e1f5d8;
    border: 1px solid #2d6a4f;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  .advantage h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  .advantage p {
    font-size: 1.1em;
  }
  
  /*Button*/
  input[type="button"] {
    border: 0;
    line-height: 2.5;
    padding: 0 20px;
    font-size: 1rem;
    justify-content: center;
    text-align: center;
    color: #fff;
    text-shadow: 1px 1px 1px #000;
    border-radius: 10px;
    background-color: #2d6a4f;
    background-image: linear-gradient(
      to top left,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0)
    );
    box-shadow: inset 2px 2px 3px rgba(255, 255, 255, 0.6),
      inset -2px -2px 3px rgba(0, 0, 0, 0.6);
    margin-top: 1.5rem;
  }
  
  input[type="button"]:hover {
    background-color: #1d4b36;
  }
  
  input[type="button"]:active {
    box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
      inset 2px 2px 3px rgba(0, 0, 0, 0.6);
  }
  
  /* Footer */
  footer {
    background-color: #2d6a4f;
    color: white;
    padding-bottom: 10px;
    padding-top: 15px;
    text-align: center;
    margin-top: 40px;
  }
  footer p {
    margin: 0;
    font-size: 1em;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }
  }
  </style>
  