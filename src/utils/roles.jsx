export const ROLE_LABELS = {
  common: "Comum",
  teacher: "Professor",
  coordinator: "Coordenador",
  admin: "Administrador",
};


export function traduzRole(role) {
  return ROLE_LABELS[role] || role;
}