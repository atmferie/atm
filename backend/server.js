const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const utenti = [
  { username: "mario", password: "1234", ruolo: "dipendente", comparto: "autisti", nome: "Mario Rossi" },
  { username: "admin", password: "admin", ruolo: "admin", nome: "Admin" }
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const utente = utenti.find(
    u => u.username === username && u.password === password
  );

  if (!utente) {
    return res.status(401).json({ error: "Credenziali errate" });
  }

  res.json(utente);
});

app.listen(3001, () => {
  console.log("✅ Backend attivo su http://localhost:3001");
});
