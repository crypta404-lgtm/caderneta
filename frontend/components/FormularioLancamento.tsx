"use client";

import { useActionState } from "react";
import {
  registrarLancamento,
  type EstadoDoEnvio,
} from "@/app/(app)/lancamentos/novo/acoes";
import { formatarValor, primeiraMaiuscula } from "@/lib/formatar";

const estadoInicial: EstadoDoEnvio = { situacao: "inicial" };

export default function FormularioLancamento() {
  const [estado, enviar, enviando] = useActionState(registrarLancamento, estadoInicial);
  // Em caso de erro, devolve o que a pessoa digitou. Em caso de sucesso, limpa.
  const digitado = estado.situacao === "erro" ? estado : null;

  return (
    <form action={enviar} className="formulario">
      <label className="campo">
        <span>Descrição</span>
        <input
          name="descricao"
          placeholder="Padaria"
          maxLength={120}
          required
          defaultValue={digitado?.descricao ?? ""}
        />
      </label>

      <label className="campo">
        <span>Valor (R$)</span>
        <input
          name="valor"
          placeholder="89,05"
          inputMode="decimal"
          required
          defaultValue={digitado?.valor ?? ""}
        />
      </label>

      <button type="submit" className="botao" disabled={enviando}>
        {enviando ? "Enviando…" : "Enviar lançamento"}
      </button>

      <div aria-live="polite">
        {!enviando && estado.situacao === "erro" && (
          <p className="aviso saida">{estado.mensagem}</p>
        )}
        {!enviando && estado.situacao === "enviado" && (
          <p className="aviso entrada">
            A API recebeu “{primeiraMaiuscula(estado.descricao)}”, de{" "}
            {formatarValor(estado.valor)}. Ainda não há banco de dados, então o
            lançamento não aparece na lista.
          </p>
        )}
      </div>
    </form>
  );
}
