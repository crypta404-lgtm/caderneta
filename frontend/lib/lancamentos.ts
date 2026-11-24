export type TipoLancamento = "entrada" | "saida";

export type Lancamento = {
  id: number;
  descricao: string;
  /** Valor em reais, sempre positivo. O tipo define se entra ou sai. */
  valor: number;
  tipo: TipoLancamento;
  /** Data no formato AAAA-MM-DD. */
  data: string;
};

// Lista fixa de exemplo. Sem banco de dados por enquanto.
export const lancamentos: Lancamento[] = [
  { id: 1, descricao: "mercado do mes", valor: 341.43, tipo: "saida", data: "2025-01-01" },
  { id: 2, descricao: "salario", valor: 856.74, tipo: "entrada", data: "2025-01-02" },
];

export function buscarLancamento(id: number): Lancamento | undefined {
  return lancamentos.find((lancamento) => lancamento.id === id);
}
