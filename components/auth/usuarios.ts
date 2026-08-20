export type Usuario = {
  correo: string;
  password: string;
  nombre: string;
  rol: "ADMIN" | "USUARIO";
};

export const usuarios: Usuario[] = [
  {
    correo: "bbenjaminb@serben.com.bo",
    password: "Benjamin68.0",
    nombre: "Bruno",
    rol: "ADMIN",
  },
  {
    correo: "mbenjaminb@serben.com.bo",
    password: "Prueba123",
    nombre: "Marcelo",
    rol: "ADMIN",
  },
  {
    correo: "operaciones@serben.com.bo",
    password: "1234",
    nombre: "Glendy",
    rol: "USUARIO",
  },
  {
    correo: "secretaria@serben.com.bo",
    password: "soyale",
    nombre: "Alejandra",
    rol: "USUARIO",
  },
];