import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import DashboardDipendente from "./pages/DashboardDipendente";
import FerieDipendente from "./pages/FerieDipendente";
import DashboardAdmin from "./pages/DashboardAdmin";
import FerieAdmin from "./pages/FerieAdmin";

function App() {
  const [user, setUser] = useState(null);

  // 🔐 LOGIN CONTRO BACKEND LOCALE
  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        alert("Credenziali errate");
        return;
      }

      const data = await res.json();
      setUser(data);

    } catch (err) {
      console.error(err);
      alert("Errore di connessione al backend");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            !user
              ? <Login login={login} />
              : <Navigate to={user.ruolo === "admin" ? "/admin" : "/dipendente"} />
          }
        />

        {/* DASHBOARD DIPENDENTE */}
        <Route
          path="/dipendente"
          element={
            user && user.ruolo === "dipendente"
              ? <DashboardDipendente user={user} logout={logout} />
              : <Navigate to="/" />
          }
        />

        {/* FERIE DIPENDENTE */}
        <Route
          path="/dipendente/ferie"
          element={
            user && user.ruolo === "dipendente"
              ? <FerieDipendente user={user} />
              : <Navigate to="/" />
          }
        />

        {/* DASHBOARD ADMIN */}
        <Route
          path="/admin"
          element={
            user && user.ruolo === "admin"
              ? <DashboardAdmin user={user} logout={logout} />
              : <Navigate to="/" />
          }
        />

        {/* FERIE ADMIN */}
        <Route
          path="/admin/ferie"
          element={
            user && user.ruolo === "admin"
              ? <FerieAdmin />
              : <Navigate to="/" />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
