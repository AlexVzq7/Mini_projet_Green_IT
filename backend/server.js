const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Connexion MongoDB locale
mongoose
   .connect("mongodb://localhost:27017/green_it", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("✅ Connecté à MongoDB"))
   .catch((err) => console.error("❌ Erreur MongoDB:", err));

// ➕ Route pour mettre à jour score et émission CO2
app.put("/update", async (req, res) => {
   const { username, newScore, newEmission } = req.body;

   try {
      // Cherche l'utilisateur dans la base de données
      const user = await User.findOne({ username });
      if (!user) {
         return res.status(404).json({ message: "Utilisateur introuvable." });
      }

      // Met à jour les champs si fournis
      if (typeof newScore === "number") {
         user.score += newScore;
      }

      if (typeof newEmission === "number") {
         user.emissionCO2 += newEmission;
      }

      await user.save();

      res.json({
         message: "✅ Données mises à jour avec succès.",
         user: {
            username: user.username,
            score: user.score,
            emissionCO2: user.emissionCO2,
         },
      });
   } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
   }
});

const bcrypt = require("bcrypt"); // normalement déjà importé dans le modèle, mais à ajouter ici aussi si besoin

app.post("/login", async (req, res) => {
   const { username, password } = req.body;
   try {
      const user = await User.findOne({ username });

      if (!user) {
         return res.status(401).json({ message: "❌ Utilisateur introuvable." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(401).json({ message: "❌ Mot de passe incorrect." });
      }

      res.json({
         message: "✅ Connexion réussie.",
         user: {
            username: user.username,
            score: user.score,
            emissionCO2: user.emissionCO2,
         },
      });
      console.log(`L'utilisateur ${user.username} s'est connecté avec succès. `);
   } catch (err) {
      res.status(500).json({ message: "❌ Erreur serveur", error: err.message });
   }
});

// ➕ Route pour mettre à jour score et emissionCO2
app.put("/update", async (req, res) => {
   const { username, newScore, newEmission } = req.body; // <-- récupère newEmission aussi

   try {
      // 1. Vérifier que l'utilisateur existe
      const user = await User.findOne({ username });
      if (!user) {
         return res.status(401).json({ message: "❌ Utilisateur introuvable." });
      }

      // 2. Mettre à jour les champs score et emissionCO2
      if (newScore !== undefined) user.score += newScore;
      if (newEmission !== undefined) user.emissionCO2 += newEmission;
      await user.save();

      res.json({
         message: "✅ Données mises à jour avec succès.",
         user: {
            username: user.username,
            score: user.score,
            emissionCO2: user.emissionCO2, // retourne aussi emissionCO2
         },
      });
      console.log(
         `✅ Données de ${user.username} mises à jour : score = ${user.score}, CO2 = ${user.emissionCO2}`
      );
   } catch (err) {
      res.status(500).json({ message: "❌ Erreur serveur", error: err.message });
   }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
