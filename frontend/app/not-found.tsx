import Link from "next/link";

export default function PaginaNaoEncontrada() {
  return (
    <main className="pagina-centro">
      <p className="rotulo">Erro 404</p>
      <h1>Página não encontrada</h1>
      <p className="lead">O endereço que você abriu não existe ou foi movido.</p>
      <div className="acoes">
        <Link href="/lancamentos" className="botao">
          Voltar aos lançamentos
        </Link>
      </div>
    </main>
  );
}
