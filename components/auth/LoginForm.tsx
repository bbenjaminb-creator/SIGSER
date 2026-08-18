"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import LoginInput from "./LoginInput";
import { usuarios } from "./usuarios";

export default function LoginForm() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [errorLogin, setErrorLogin] = React.useState("");

  const router = useRouter();

  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const newErrors = {
    username: "",
    password: "",
  };

  setErrorLogin("");

  if (!username.trim()) {
    newErrors.username = "Ingrese su correo.";
  }

  if (!password.trim()) {
    newErrors.password = "Ingrese su contraseña.";
  }

  setErrors(newErrors);

  if (newErrors.username || newErrors.password) {
    return;
  }

  const usuarioEncontrado = usuarios.find(
    (usuario) =>
      usuario.correo.toLowerCase() ===
        username.trim().toLowerCase() &&
      usuario.password === password
  );

  if (!usuarioEncontrado) {
    setErrorLogin(
      "Correo o contraseña incorrectos."
    );
    return;
  }

  router.push("/dashboard");
}

  return (
    <form className="mt-10" onSubmit={handleSubmit}>

      <LoginInput
        label="Correo electrónico"
placeholder="Ingrese su correo electrónico"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={errors.username}
      />

      <LoginInput
        label="Contraseña"
        type="password"
        placeholder="Ingrese su contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

{errorLogin && (
  <p className="mb-4 text-sm text-red-600 text-center">
    {errorLogin}
  </p>
)}

      <div className="flex items-center justify-between mt-2 mb-6">

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" />
          Recordarme
        </label>

        <button
          type="button"
          className="text-cyan-700 text-sm hover:underline"
        >
          ¿Olvidó su contraseña?
        </button>

      </div>

      <button
        type="submit"
        className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-3 rounded-xl text-lg transition"
      >
        Iniciar sesión
      </button>

      <p className="mt-8 text-xs text-center text-gray-400">
        Versión 1.0.0
      </p>

    </form>
  );
}