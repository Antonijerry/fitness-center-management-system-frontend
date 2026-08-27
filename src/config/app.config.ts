
// This gives us one centralized source for the API URL.
import { API_CONFIG } from "@/config/api";

export const appConfig = {
  appName: "Fitness Management System",
  apiBaseUrl: API_CONFIG.baseUrl,
} as const;