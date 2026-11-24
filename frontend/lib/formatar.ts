const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarValor(valor: number): string {
  return moeda.format(valor);
}

/** Recebe AAAA-MM-DD e devolve, por exemplo, "1 de janeiro de 2025". */
export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia)).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Deixa só a primeira letra maiúscula: "mercado do mes" vira "Mercado do mes". */
export function primeiraMaiuscula(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function rotuloTipo(tipo: "entrada" | "saida"): string {
  return tipo === "entrada" ? "Entrada" : "Saída";
}
