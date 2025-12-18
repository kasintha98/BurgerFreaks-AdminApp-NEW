const isLocalhost = window.location.hostname === "localhost";
const baseUrl = isLocalhost ? "http://localhost:2000" : "https://burgerfreaks-backend-new.onrender.com";
export const api = `${baseUrl}/api`;
export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};