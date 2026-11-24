"use server";

import { enviarLancamento } from "@/lib/api";

export type EstadoDoEnvio =
  | { situacao: "inicial" }
  | { situacao: "enviado"; valor: number; descricao: string }
  | { situacao: "erro"; mensagem: string; valor: string; descricao: string };

const MENSAGENS: Record<string, string> = {
  valor_invalido: "Informe um valor maior que zero, por exemplo 89,05.",
  descricao_invalida: "Informe uma descrição com até 120 caracteres.",
  nao_autorizado: "O app não tem permissão para usar a API. Confira a API_KEY.",
  api_nao_configurada: "A API ainda não está configurada neste ambiente.",
  api_indisponivel: "Não foi possível falar com a API. Confira se o back-end está rodando.",
};

export async function registrarLancamento(
  _anterior: EstadoDoEnvio,
  formulario: FormData,
): Promise<EstadoDoEnvio> {
  const valor = String(formulario.get("valor") ?? "");
  const descricao = String(formulario.get("descricao") ?? "");

  // Quem valida é a API: a regra fica em um lugar só.
  const resposta = await enviarLancamento(valor, descricao);

  if (resposta.ok) {
    return { situacao: "enviado", valor: resposta.valor, descricao: resposta.descricao };
  }

  return {
    situacao: "erro",
    mensagem: MENSAGENS[resposta.erro] ?? "A API respondeu de um jeito inesperado. Tente de novo.",
    valor,
    descricao,
  };
}
