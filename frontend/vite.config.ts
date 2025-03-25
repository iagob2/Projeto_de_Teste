// Importa a função defineConfig do Vite para configurar o projeto
import { defineConfig } from "vite";

// Importa o plugin Vue para permitir o uso do Vue.js no projeto
import vue from "@vitejs/plugin-vue";

// Exporta a configuração do Vite
export default defineConfig({
  plugins: [vue()], // Adiciona o plugin do Vue.js

  server: {
    port: 5173, // Define a porta do servidor de desenvolvimento

    proxy: {
      "/api": {
        target: "http://localhost:3000", // Redireciona chamadas para a API local do backend
        changeOrigin: true, // Permite modificar o cabeçalho 'Origin' para evitar problemas de CORS
      },
    },
  },
});
