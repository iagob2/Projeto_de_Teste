# Scraper de Produtos da Amazon

Este projeto é uma aplicação simples de raspagem de dados da Amazon, utilizando Node.js (com Bun), Axios e JSDOM. O objetivo do projeto é permitir que o usuário busque produtos na Amazon e exiba informações como título, avaliação, número de avaliações e imagens dos produtos.

## Funcionalidades

- **Busca de Produtos**: O usuário pode buscar produtos por palavra-chave.
- **Exibição dos Resultados**: Os produtos são exibidos com título, avaliação, número de avaliações e imagem.
- **Servidor Local**: O projeto roda localmente em um servidor na porta 3000.

## Tecnologias Utilizadas

- **Node.js** (com Bun) - Servidor para manipulação de rotas e requisições HTTP.
- **Axios** - Para realizar requisições HTTP e obter os dados da Amazon.
- **JSDOM** - Para manipulação do DOM dos resultados da Amazon.
- **TypeScript** - Utilizado para tipagem estática e maior segurança no código.
- **HTML e CSS** - Para a construção da interface de usuário.

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (com Bun) instalado.
- **npm** ou **yarn** para gerenciamento de pacotes.

### Instalação

1. Clone o repositório para a sua máquina:

    ```bash
    git clone https://github.com/seu-usuario/scraper-amazon.git
    cd scraper-amazon
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    # ou
    yarn install
    ```

### Rodando o Projeto

Para iniciar o servidor, execute o seguinte comando:

```bash
Isso vai rodar o servidor na porta 3000 e você pode acessar a aplicação no navegador em:

http://localhost:3000

Como Usar
Acesse o site no navegador.

Insira uma palavra-chave de pesquisa (exemplo: "livros de programação").

Clique no botão de busca para exibir os produtos encontrados na Amazon.