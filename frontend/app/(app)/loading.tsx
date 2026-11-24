export default function Carregando() {
  return (
    <div className="carregando" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>Carregando…</p>
    </div>
  );
}
