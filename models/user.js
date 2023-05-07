const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  // Campos existentes
  username: String,
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  // Nuevo campo
  role: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  }
});
// Definir métodos o hooks para interactuar con la base de datos

// Crear el modelo de usuario
const User = mongoose.model('User', userSchema);

module.exports = User;