const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const SECRET_KEY = '29062003';

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/login')
    .then(
        ()=>{
            console.log('Connected To login');
        }
    )
    .catch(
        (error)=>{
        console.log(error);
    })

// Modèle utilisateur
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Inscription
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.status(201).send('Utilisateur enregistré avec succès');
});

// Connexion
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Utilisateur non trouvé');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).send('Mot de passe incorrect');

  const payload = {
    email: user.email,
    nom: user.password
};

const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  res.json({ token });
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
