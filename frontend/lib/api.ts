// Conversa com o back-end. Só pode ser usado no servidor (lê a API_KEY).

const URL_LOCAL = "http://localhost:3000";
const TEMPO_LIMITE_MS = 8000;

export type RespostaDaApi =
  | { ok: true; valor: number; descricao: string }
  | { ok: false; erro: string };

function enderecoDaApi(): string {
  if (process.env.API_URL) return process.env.API_URL.replace(/\/+$/, "");
  // Em produção não há endereço padrão: precisa ser configurado.
  return process.env.NODE_ENV === "production" ? "" : URL_LOCAL;
}

export async function enviarLancamento(
  valor: string,
  descricao: string,
): Promise<RespostaDaApi> {
  const base = enderecoDaApi();
  if (!base) return { ok: false, erro: "api_nao_configurada" };

  const cabecalhos: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.API_KEY) cabecalhos["x-api-key"] = process.env.API_KEY;

  try {
    const resposta = await fetch(`${base}/lancamentos`, {
      method: "POST",
      headers: cabecalhos,
      body: JSON.stringify({ valor, descricao }),
      cache: "no-store",
      signal: AbortSignal.timeout(TEMPO_LIMITE_MS),
    });
    const corpo = await resposta.json().catch(() => null);

    if (
      resposta.status === 201 &&
      corpo?.criado === true &&
      typeof corpo.valor === "number" &&
      typeof corpo.descricao === "string"
    ) {
      return { ok: true, valor: corpo.valor, descricao: corpo.descricao };
    }

    return {
      ok: false,
      erro: typeof corpo?.erro === "string" ? corpo.erro : "resposta_inesperada",
    };
  } catch (erro) {
    console.error("Falha ao chamar a API:", erro);
    return { ok: false, erro: "api_indisponivel" };
  }
}
