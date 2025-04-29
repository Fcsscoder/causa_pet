require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.static("./public"));

const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");

// Rotas

app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(process.env.PORT || 5000);
