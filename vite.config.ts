import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  //added for shadcn ui to enable absolute imports @/ instead of relative imports like ../../
  resolve: {
    alias: {
      "@": `${import.meta.dirname}/src`
    }
  }
})
