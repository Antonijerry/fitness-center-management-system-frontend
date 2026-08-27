export const API_CONFIG = {
  baseUrl:
    import.meta.env.VITE_API_BASE_URL?.trim() ||
    "http://localhost:8080/api/v1",

  actuatorBaseUrl:
    import.meta.env.VITE_ACTUATOR_BASE_URL?.trim() ||
    "http://localhost:8080",

  timeout: 30_000,
} as const;