import Link from "next/link";
import FormularioLancamento from "@/components/FormularioLancamento";

export const metadata = {
  title: "Novo lançamento · Caderneta da Claudia",
};

export default function PaginaNovoLancamento() {
  return (
    <>
      <Link href="/lancamentos" className="voltar">
        ← Voltar aos lançamentos
      </Link>

      <header className="cabecalho-pagina">
        <p className="rotulo">Movimentações</p>
        <h1>Novo lançamento</h1>
        <p>O envio vai para a API. Por enquanto, nada é salvo.</p>
      </header>

      <FormularioLancamento />
    </>
  );
}
