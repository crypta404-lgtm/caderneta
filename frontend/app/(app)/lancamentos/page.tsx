import Link from "next/link";
import LancamentoCard from "@/components/LancamentoCard";
import { lancamentos } from "@/lib/lancamentos";

export const metadata = {
  title: "Lançamentos · Caderneta da Claudia",
};

export default function PaginaLancamentos() {
  return (
    <>
      <header className="cabecalho-pagina com-acao">
        <div>
          <p className="rotulo">Movimentações</p>
          <h1>Lançamentos</h1>
        </div>
        <Link href="/lancamentos/novo" className="botao">
          Novo lançamento
        </Link>
      </header>

      <section className="lista" aria-label="Lista de lançamentos">
        {lancamentos.map((lancamento) => (
          <LancamentoCard key={lancamento.id} lancamento={lancamento} />
        ))}
      </section>
    </>
  );
}
