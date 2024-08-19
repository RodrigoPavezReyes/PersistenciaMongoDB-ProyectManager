import express from "express";
import path from "path";
import { create } from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import viewsRouter from "./routes/views.router.js";
import mongoose from "mongoose";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url); // Obtiene la ruta del archivo actual
const __dirname = dirname(__filename); // Obtiene el directorio del archivo actual

const app = express();
const PORT = 8080;

// Configuración de Handlebars
const hbs = create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
});

// Configuración del motor de plantillas
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public'))); // Cambiado a '/public' para servir archivos estáticos

// Conexión con la base de datos
const enviroment = async () => {
    await mongoose.connect("mongodb+srv://devpavez:20232023@clusterpavez.pg1fh.mongodb.net/productsDB?retryWrites=true&w=majority&appName=ClusterPavez");
    console.log("conectado a DB");
};
enviroment();

// Rutas
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/", viewsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
