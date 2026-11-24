import Link from "next/link";

export default function PaginaInicial() {
  return (
    <main className="pagina-centro">
      <span className="marca-icone" aria-hidden="true">C</span>
      <p className="rotulo">Controle financeiro pessoal</p>
      <h1>
        Caderneta <span className="destaque">da Claudia</span>
      </h1>
      <p className="lead">
        Acompanhe entradas e saídas com clareza, em um lugar só. Simples como
        uma caderneta, organizado como um painel.
      </p>
      <div className="acoes">
        <Link href="/lancamentos" className="botao">
          Ver lançamentos
        </Link>
        <Link href="/dashboard" className="botao secundario">
          Abrir dashboard
        </Link>
      </div>
    </main>
  );
}
