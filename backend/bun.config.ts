// bun.config.ts

export default {
  // Define o ponto de entrada principal do projeto
  entrypoints: ["src/index.ts"],

  // Define a pasta de saída para o código compilado
  outdir: "dist",

  // Especifica que o alvo da compilação é o ambiente Bun
  target: "bun",
};
