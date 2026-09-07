export const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined)?.replace(/\/$/, '') ||
  '';

export const apiUrl = (path: string) => `${API_BASE}${path}`;
