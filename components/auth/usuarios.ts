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
    nombre: "Nombre de tu hermano",
    rol: "ADMIN",
  },
];