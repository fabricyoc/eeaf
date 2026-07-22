export function somenteData(data) {
  if (!data) return "";

  return data.substring(0, 10);
}

export function hoje() {
  return new Date().toISOString().substring(0, 10);
}
