// backend/src/index.ts
import { serve } from "bun";
import fs from "fs";
import path from "path";
import axios from "axios";
import { JSDOM } from "jsdom";

// Função para raspar os dados da Amazon
const scrapeDados = async (palavraChave: string) => {
  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(palavraChave)}`;
  
  try {
    const resposta = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    
    const dom = new JSDOM(resposta.data);
    const documento = dom.window.document;
    
    const produtos = Array.from(documento.querySelectorAll(".s-result-item")).map((item) => {
      const titulo = item.querySelector("h2 a span")?.textContent || "";
      const classificacao = item.querySelector(".a-icon-alt")?.textContent || "";
      const numeroAvaliacoes = item.querySelector(".a-size-small .a-size-base")?.textContent || "";
      const urlImagem = item.querySelector("img")?.getAttribute("src") || "";
      
      return {
        titulo,
        classificacao,
        numeroAvaliacoes,
        urlImagem,
      };
    });
    
    return produtos;
  } catch (erro) {
    console.error("Erro ao raspar dados da Amazon:", erro);
    throw new Error("Falha ao obter os dados");
  }
};

// Configuração do servidor Bun
serve({
  port: 3000, // Define a porta do servidor
  async fetch(req) { // A função fetch agora é marcada como 'async'
    const url = new URL(req.url);

    // Serve o arquivo index.html na raiz
    if (url.pathname === "/") {
      const filePath = path.join(__dirname, "../..", "frontend", "public", "index.html");
      if (fs.existsSync(filePath)) {
        return new Response(fs.readFileSync(filePath), {
          headers: { "Content-Type": "text/html" },
        });
      }
      return new Response("Arquivo não encontrado", { status: 404 });
    }

    // Serve arquivos estáticos (CSS, JS)
    const filePath = path.join(__dirname, "../../frontend", url.pathname);
    if (fs.existsSync(filePath)) {
      const fileExtension = path.extname(filePath);
      let contentType = "text/html";
      if (fileExtension === ".css") contentType = "text/css";
      if (fileExtension === ".js") contentType = "application/javascript";
      return new Response(fs.readFileSync(filePath), {
        headers: { "Content-Type": contentType },
      });
    }

    // Rota para a API de raspagem de dados
    if (url.pathname === "/api/scrape" && url.searchParams.has("palavra")) {
      const palavraChave = url.searchParams.get("palavra")!;
      try {
        const produtos = await scrapeDados(palavraChave); // Chama a função de scrape
        return new Response(JSON.stringify(produtos), { status: 200, headers: { "Content-Type": "application/json" } });
      } catch (erro) {
        return new Response(JSON.stringify({ erro: "Falha ao scrape os dados" }), { status: 500 });
      }
    }

    return new Response("Rota não encontrada", { status: 404 });
  },
});

console.log("Servidor rodando na porta 3000");