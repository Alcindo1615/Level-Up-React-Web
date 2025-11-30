// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { loginUsuario } from "../api/usuarioService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // 👇 AHORA login usa el endpoint del backend
  const login = async (mail, password) => {
    try {
      const usuario = await loginUsuario({ mail, password });

      // usuario viene desde el backend (rut, nombre, mail, idrol, etc.)
      setUser(usuario);

      return { ok: true, usuario };
    } catch (error) {
      console.error("Error en login:", error);

      let message = "Error al conectar con el servidor";

      if (error.response) {
        // 4xx/5xx desde el backend
        message = error.response.data || "Usuario o contraseña incorrectos";
      }

      setUser(null);
      return { ok: false, message };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
