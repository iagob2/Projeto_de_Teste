// src/raspagem.ts
import { serve } from "bun";
import axios from "axios";
import { JSDOM } from "jsdom";

serve({
  port: 8080,
  async fetch(req) {
    const urlRequisicao = new URL(req.url);

    // Verifica se a rota é válida e se contém a URL do site a ser raspado
    if (urlRequisicao.pathname === "/api/scrape" && urlRequisicao.searchParams.has("url")) {
      const urlAlvo = urlRequisicao.searchParams.get("url")!;

      try {
        // Faz a requisição HTTP para obter o conteúdo da página
        const resposta = await axios.get(urlAlvo, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/58.0.3029.110 Safari/537.3",
          },
        });

        // Carrega o conteúdo HTML na biblioteca JSDOM
        const dom = new JSDOM(resposta.data);
        const documento = dom.window.document;

        // Extrai o título da página
        const tituloPagina = documento.querySelector("title")?.textContent || "Título não encontrado";

        // Retorna a resposta em formato JSON
        return new Response(JSON.stringify({ titulo: tituloPagina }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });

      } catch (erro) {
        console.error("Erro ao raspar a página:", erro);
        return new Response(JSON.stringify({ erro: "Falha ao acessar a página fornecida." }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Resposta para rotas não encontradas
    return new Response(JSON.stringify({ erro: "Rota não encontrada." }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  },
});

console.log("Servidor rodando na porta 8080...");
