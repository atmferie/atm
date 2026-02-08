import React, { useState } from "react";
import logo from "../assets/logo.png";

function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ruolo, setRuolo] = useState("dipendente");
  const [comparto, setComparto] = useState("autisti");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST login al backend
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Credenziali errate");
        return;
      }

      const user = await res.json();

      // Verifica comparto se dipendente
      if (user.ruolo === "dipendente" && user.comparto !== comparto) {
        alert(`Comparto errato! Il tuo comparto corretto è: ${user.comparto}`);
        return;
      }

      // login con dati dal backend
      login(user.username, password, user.ruolo, user.comparto || null);

    } catch (err) {
      console.error(err);
      alert("Errore di connessione al backend");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* LOGO */}
      <div style={{ marginBottom: 30, textAlign: "center" }}>
        <img src={logo} alt="Logo Aziendale" style={{ height: 80 }} />
      </div>

      {/* FORM LOGIN */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          padding: 20,
          border: "1px solid #ccc",
          borderRadius: 10,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 10, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 10, padding: 6, borderRadius: 4, border: "1px solid #ccc" }}
        />

        {ruolo === "dipendente" && (
          <>
            <label>Comparto</label>
            <select
              value={comparto}
              onChange={(e) => setComparto(e.target.value)}
              style={{ marginBottom: 10, padding: 6, borderRadius: 4 }}
            >
              <option value="autisti">Autisti</option>
              <option value="amministrativi">Amministrativi</option>
              <option value="rimessa">Rimessa</option>
            </select>
          </>
        )}

        <label>Ruolo</label>
        <select
          value={ruolo}
          onChange={(e) => setRuolo(e.target.value)}
          style={{ marginBottom: 20, padding: 6, borderRadius: 4 }}
        >
          <option value="dipendente">Dipendente</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: 10,
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.filter = "brightness(0.9)")}
          onMouseOut={(e) => (e.currentTarget.style.filter = "brightness(1)")}
        >
          Accedi
        </button>
      </form>
    </div>
  );
}

export default Login;
