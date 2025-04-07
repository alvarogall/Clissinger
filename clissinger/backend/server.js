const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://admin:kissinger@clissinger.5j6ur6r.mongodb.net/dbclissinger?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

//------------------------------------------------------------------------------------------------------
//                                  Definición del modelo de usuario
//------------------------------------------------------------------------------------------------------

const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
  user: { type: String, required: true },
  password: { type: String, required: true }
});

const Usuario = model('Usuario', usuarioSchema);

//------------------------------------------------------------------------------------------------------
//                                  Definición del modelo de nivel
//------------------------------------------------------------------------------------------------------

const levelSchema = new Schema({
  word: { type: String, required: true },
  image1: { type: String, required: true },
  image2: { type: String, required: true },
  image3: { type: String, required: true },
  image4: { type: String, required: true }
});

const Level = model('Level', levelSchema);


//------------------------------------------------------------------------------------------------------
//                                           Rutas de usuario
//------------------------------------------------------------------------------------------------------

app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
  const nuevo = new Usuario(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

//------------------------------------------------------------------------------------------------------
//                            Rutas de juego (dataset de todos los niveles)
//------------------------------------------------------------------------------------------------------


app.get('/levels', async (req, res) => {
  const levels = await Level.find();
  res.json(levels);
});


app.post('/levels', async (req, res) => {
  const nuevo = new Level(req.body);
  await nuevo.save();
  res.status(201).json(nuevo);
});

//------------------------------------------------------------------------------------------------------
//                                        Despliegue de servidor
//------------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
