const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());



// 🔗 Connexion MongoDB locale
mongoose.connect('mongodb://localhost:27017/green_it', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// ➕ Route pour créer un utilisateur
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis." });
      }
  
      // Vérifie si le nom d'utilisateur existe déjà
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Nom d'utilisateur déjà pris." });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.status(201).json({
        message: "✅ Utilisateur créé avec succès.",
        user: {
          username: newUser.username,
          score: newUser.score,
          emissionCO2: newUser.emissionCO2
        }
      });
      console.log("✅ Utilisateur créé avec succès.");
    } catch (err) {
      res.status(500).json({ message: "❌ Erreur serveur", error: err.message });
    }
});

const bcrypt = require('bcrypt'); // normalement déjà importé dans le modèle, mais à ajouter ici aussi si besoin

app.post('/login', async (req, res) => {
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
        emissionCO2: user.emissionCO2
    }
    });
    console.log(`L'utilisateur ${user.username} s'est connecté avec succès. `)
} catch (err) {
    res.status(500).json({ message: "❌ Erreur serveur", error: err.message });
}
});
  


const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
