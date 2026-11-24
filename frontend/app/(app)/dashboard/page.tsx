import { formatarValor } from "@/lib/formatar";
import { lancamentos } from "@/lib/lancamentos";

export const metadata = {
  title: "Dashboard · Caderneta da Claudia",
};

export default function PaginaDashboard() {
  const totalEntradas = lancamentos
    .filter((lancamento) => lancamento.tipo === "entrada")
    .reduce((soma, lancamento) => soma + lancamento.valor, 0);

  const totalSaidas = lancamentos
    .filter((lancamento) => lancamento.tipo === "saida")
    .reduce((soma, lancamento) => soma + lancamento.valor, 0);

  const saldo = totalEntradas - totalSaidas;

  return (
    <>
      <header className="cabecalho-pagina">
        <p className="rotulo">Visão geral</p>
        <h1>Dashboard</h1>
      </header>

      <section className="indicadores" aria-label="Resumo financeiro">
        <article className="indicador">
          <p>Entradas</p>
          <strong className="entrada">{formatarValor(totalEntradas)}</strong>
        </article>
        <article className="indicador">
          <p>Saídas</p>
          <strong className="saida">{formatarValor(totalSaidas)}</strong>
        </article>
        <article className="indicador">
          <p>Saldo</p>
          <strong className={saldo >= 0 ? "entrada" : "saida"}>
            {formatarValor(saldo)}
          </strong>
        </article>
      </section>
    </>
  );
}
