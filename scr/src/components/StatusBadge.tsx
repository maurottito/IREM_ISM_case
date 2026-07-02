type ResultValue = 'P. vivax' | 'P. falciparum' | 'Negativa' | 'Inválida';

function resultClass(result: ResultValue): string {
  if (result === 'Negativa') return 'badge-negative';
  if (result === 'Inválida') return 'badge-pending';
  return 'badge-positive';
}

export function StatusBadge({ result }: { result: ResultValue }) {
  return <span className={`badge ${resultClass(result)}`}>{result}</span>;
}
