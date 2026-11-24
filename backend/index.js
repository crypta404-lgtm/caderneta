const crypto = require("node:crypto");
const express = require("express");

// A porta padrão é 3000. Use a variável PORT para trocar (o "next dev" também usa a 3000).
const PORTA = Number(process.env.PORT) || 3000;
// Com API_KEY definida, o POST /lancamentos exige o cabeçalho "x-api-key".
const API_KEY = process.env.API_KEY || "";
const TAMANHO_MAXIMO_DESCRICAO = 120;

if (!API_KEY && process.env.NODE_ENV === "production") {
  console.error("Defina API_KEY antes de subir em produção.");
  process.exit(1);
}

const app = express();
app.disable("x-powered-by");

function resumo(texto) {
  return crypto.createHash("sha256").update(texto).digest();
}

function exigirChave(req, res, next) {
  if (!API_KEY) return next(); // sem chave configurada: liberado, só para uso local

  const enviada = req.get("x-api-key") || "";
  // Comparação em tempo constante, para não vazar a chave pelo tempo de resposta.
  if (!crypto.timingSafeEqual(resumo(enviada), resumo(API_KEY))) {
    return res.status(401).json({ erro: "nao_autorizado" });
  }
  next();
}

// Aceita número, "89.05" ou "89,05". Devolve null se não for maior que zero.
function lerValor(bruto) {
  // Sem esta checagem, Number(true) viraria 1 e Number(["5"]) viraria 5.
  if (typeof bruto !== "number" && typeof bruto !== "string") return null;

  let texto = bruto;
  // A vírgula só vale como decimal, com até 2 casas. "1.234,56" e "1,234" são recusados.
  if (typeof texto === "string" && /^\s*\d+,\d{1,2}\s*$/.test(texto)) {
    texto = texto.replace(",", ".");
  }

  const numero = Number(texto);
  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

// Devolve o texto sem espaços nas pontas, ou null se estiver vazio ou longo demais.
function lerDescricao(bruta) {
  if (typeof bruta !== "string") return null;

  const texto = bruta.trim();
  return texto.length > 0 && texto.length <= TAMANHO_MAXIMO_DESCRICAO ? texto : null;
}

app.get("/health", (req, res) => {
  res.status(200).json({ servico: "financas-claudia", versao: "1.0.0" });
});

// A chave é conferida antes de o corpo do pedido ser lido.
app.post("/lancamentos", exigirChave, express.json({ limit: "10kb" }), (req, res) => {
  // No Express 5, req.body é undefined quando o pedido não vem como JSON.
  const corpo = req.body || {};

  const valor = lerValor(corpo.valor);
  if (valor === null) {
    return res.status(400).json({ erro: "valor_invalido" });
  }

  const descricao = lerDescricao(corpo.descricao);
  if (descricao === null) {
    return res.status(400).json({ erro: "descricao_invalida" });
  }

  // Ainda não grava em banco: apenas confirma o que recebeu.
  res.status(201).json({ criado: true, valor, descricao });
});

app.use((req, res) => {
  res.status(404).json({ erro: "rota_nao_encontrada" });
});

// Todo erro sai em JSON, sem stack trace para quem chamou.
app.use((erro, req, res, next) => {
  if (res.headersSent) return next(erro);

  if (erro.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "json_invalido" });
  }
  if (erro.type === "entity.too.large") {
    return res.status(413).json({ erro: "corpo_grande_demais" });
  }
  if (erro.status >= 400 && erro.status < 500) {
    return res.status(erro.status).json({ erro: "pedido_invalido" });
  }

  console.error(erro);
  res.status(500).json({ erro: "erro_interno" });
});

app.listen(PORTA, (erro) => {
  if (erro) {
    console.error(`Não foi possível subir na porta ${PORTA}: ${erro.message}`);
    process.exit(1);
  }
  console.log(`financas-claudia ouvindo em http://localhost:${PORTA}`);
  if (!API_KEY) {
    console.warn("Aviso: API_KEY não definida. O POST /lancamentos está sem proteção.");
  }
});
