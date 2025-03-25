// frontend/src/main.js
const inputPalavraChave = document.getElementById("palavra-chave");
const botaoBuscar = document.getElementById("scrapeButton");
const divResultados = document.getElementById("results");

// Adiciona um evento de clique ao botão de busca
botaoBuscar.addEventListener("click", async () => {
  // Obtém e limpa o valor do input
  const palavraChave = inputPalavraChave.value.trim();

  // Se o campo estiver vazio, exibe um alerta e interrompe a execução
  if (!palavraChave) {
    alert("Por favor, insira uma palavra-chave.");
    return;
  }

  try {
    // Faz uma requisição para a API de scrape passando a palavra-chave
    const resposta = await fetch(`/api/scrape?palavra=${encodeURIComponent(palavraChave)}`);

    // Se a resposta não for bem-sucedida, lança um erro
    if (!resposta.ok) {
      throw new Error("Falha ao buscar os dados.");
    }

    // Converte a resposta para JSON
    const produtos = await resposta.json();

    // Limpa os resultados anteriores na página
    divResultados.innerHTML = "";

    // Percorre a lista de produtos retornados e adiciona ao HTML
    produtos.forEach((produto) => {
      // Cria um novo elemento div para cada produto
      const divProduto = document.createElement("div");
      divProduto.className = "produto"; // Adiciona a classe CSS para estilização

      // Define o conteúdo do produto, incluindo título, avaliação, número de avaliações e imagem
      divProduto.innerHTML = `
        <h2>${produto.titulo}</h2>
        <p>⭐ Avaliação: ${produto.classificacao}</p>
        <p>📢 Número de avaliações: ${produto.numeroAvaliacoes}</p>
        <img src="${produto.urlImagem}" alt="${produto.titulo}">
      `;

      // Adiciona o produto ao container de resultados
      divResultados.appendChild(divProduto);
    });
  } catch (erro) {
    // Em caso de erro, exibe a mensagem no console e alerta o usuário
    console.error("Erro ao buscar os dados:", erro);
    alert("Erro ao buscar os dados. Verifique o console para mais detalhes.");
  }
});