const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://admin:kissinger@clissinger.5j6ur6r.mongodb.net/dbclissinger?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));


//------------------------------------------------------------------------------------
//                      Definición de esquemas y modelos
//------------------------------------------------------------------------------------


const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true }
});

const Usuario = model('Usuario', usuarioSchema);

const levelSchema = new Schema({
  word: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  image4: { type: String, required: true },
  thematic: { type: String, required: true }
});

const Level = model('Level', levelSchema);

const quizSchema = new Schema({
  thematic: { type: String, required: true },
  question : { type: String, required: true },
  answer1: { type: String, required: true },
  answer2: { type: String, required: true },
  answer3: { type: String, required: true },
  answer4: { type: String, required: true },
  correctAnswer: { type: String, required: true },
});

const Quiz = model('Quiz', quizSchema);




//------------------------------------------------------------------------------------
//                                Definición de rutas
//------------------------------------------------------------------------------------

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                                  Rutas de Login
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.post('/api/login', async (req, res) => {
  const { user, password } = req.body;
  const foundUser = await Usuario.findOne({ user, password });
  if (foundUser) {
    res.status(200).json({ message: 'Login exitoso', user: foundUser });
  } else {
    res.status(401).json({ message: 'Usuario o contraseña no encontrados' });
  }
});

app.get('/api/login', async (req, res) => {
  const users = await Usuario.find();
  res.json(users);
});

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                                  Rutas de Register
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.post('/api/register', async (req, res) => {
  const nuevo = new Usuario(req.body);
  console.log(nuevo);
  const foundUser = await Usuario.findOne({ user: nuevo.user });
  if (foundUser) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }
  await nuevo.save();
  res.status(201).json(nuevo);
});

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                                  Rutas de Levels
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.get('/api/levels', async (req, res) => {
  const { thematic } = req.query;

  let query = {};
  if (thematic) {
    query.thematic = thematic;
  }

  const levels = await Level.find(query);
  res.json(levels);
});

app.post('/api/levels', async (req, res) => {
  const nuevo = new Level(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                                  Rutas de Quiz
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.get('/api/quiz', async (req, res) => {
  const quiz = await Quiz.find();
  res.json(quiz);
}
);

app.post('/api/quiz', async (req, res) => {
  const nuevo = new Quiz(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
}
);

// Exportar como función serverless
module.exports = app;
module.exports.handler = serverless(app);
