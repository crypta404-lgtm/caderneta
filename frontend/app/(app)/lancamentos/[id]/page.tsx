import Link from "next/link";
import { notFound } from "next/navigation";
import { formatarData, formatarValor, primeiraMaiuscula, rotuloTipo } from "@/lib/formatar";
import { buscarLancamento, lancamentos } from "@/lib/lancamentos";

type PaginaLancamentoProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return lancamentos.map((lancamento) => ({ id: String(lancamento.id) }));
}

export async function generateMetadata({ params }: PaginaLancamentoProps) {
  const { id } = await params;
  const lancamento = buscarLancamento(Number(id));

  return {
    title: lancamento
      ? `${lancamento.descricao} · Caderneta da Claudia`
      : "Lançamento não encontrado",
  };
}

export default async function PaginaLancamento({ params }: PaginaLancamentoProps) {
  const { id } = await params;
  const lancamento = buscarLancamento(Number(id));

  if (!lancamento) {
    notFound();
  }

  const { descricao, valor, tipo, data } = lancamento;
  const sinal = tipo === "entrada" ? "+" : "−";

  return (
    <>
      <Link href="/lancamentos" className="voltar">
        ← Voltar aos lançamentos
      </Link>

      <article className={`detalhe tipo-${tipo}`}>
        <p className="rotulo">{rotuloTipo(tipo)}</p>
        <h1 className="card-titulo">{primeiraMaiuscula(descricao)}</h1>

        <p className={`valor detalhe-valor ${tipo}`}>
          {sinal} {formatarValor(valor)}
        </p>

        <dl>
          <div>
            <dt>Tipo</dt>
            <dd>{rotuloTipo(tipo)}</dd>
          </div>
          <div>
            <dt>Data</dt>
            <dd>{formatarData(data)}</dd>
          </div>
          <div>
            <dt>Código</dt>
            <dd>#{lancamento.id}</dd>
          </div>
        </dl>
      </article>
    </>
  );
}
