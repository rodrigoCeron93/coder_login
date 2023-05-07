const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const {config} = require("./config/config")
const {initializePassport} = require("./config/passportconfig")
const passport = require('passport');
const app = express();



config.connectDB()
// URL de conexión a MongoDB
const mongoURI = 'mongodb+srv://rodcerflo:K03QGaME93yhiB7B@coder.ctilfrd.mongodb.net/test?authSource=admin&replicaSet=atlas-sp1qta-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

// Conexión a MongoDB
const sessionStore = MongoStore.create({
    mongoUrl: mongoURI,
    mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true},
    ttl: 15
  })


  initializePassport()

// Configuración de Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));

// Configuración del middleware de sesiones
app.use(
  session({
    secret: 'mysecretkey',
    resave: true,
    saveUninitialized: true,
    store: sessionStore
  })
);

// Configuración del router
const routes = require('./routes');
app.use('/', routes);
app.use(passport.initialize())
// Configuración de otros middlewares y ajustes adicionales

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});