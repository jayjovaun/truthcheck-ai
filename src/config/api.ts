// Use relative paths for Vercel serverless functions
// In production, this will be your domain (e.g., https://yourapp.vercel.app)
// In development, you can set VITE_API_BASE_URL to http://localhost:3000 for Vercel dev
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || ''; 