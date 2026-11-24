import Link from "next/link";
import type { Lancamento } from "@/lib/lancamentos";
import { formatarData, formatarValor, primeiraMaiuscula, rotuloTipo } from "@/lib/formatar";

type LancamentoCardProps = {
  lancamento: Lancamento;
};

export default function LancamentoCard({ lancamento }: LancamentoCardProps) {
  const { id, descricao, valor, tipo, data } = lancamento;
  const sinal = tipo === "entrada" ? "+" : "−";

  return (
    <Link href={`/lancamentos/${id}`} className={`card-lancamento tipo-${tipo}`}>
      <div className="card-corpo">
        <span className="card-titulo">{primeiraMaiuscula(descricao)}</span>
        <span className="card-meta">
          {rotuloTipo(tipo)} · {formatarData(data)}
        </span>
      </div>
      <span className={`valor ${tipo}`}>
        {sinal} {formatarValor(valor)}
      </span>
    </Link>
  );
}
