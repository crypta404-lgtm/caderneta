import Link from "next/link";
import type { ReactNode } from "react";

export default function LayoutDoApp({ children }: { children: ReactNode }) {
  return (
    <div className="shell">
      <aside className="menu">
        <Link href="/" className="marca-app">
          <span className="marca-icone" aria-hidden="true">C</span>
          Caderneta da Claudia
        </Link>
        <nav aria-label="Menu principal">
          <p className="menu-rotulo">Menu</p>
          <ul>
            <li>
              <Link href="/lancamentos">Lançamentos</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="conteudo">{children}</div>
    </div>
  );
}
