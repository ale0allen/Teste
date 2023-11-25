// clientes/livros-next/classes/modelo/Livro.ts
export default class Livro {
  codigo: string | null;
  codEditora: number;
  titulo: string; // Mantido como 'titulo'
  resumo: string;
  autores: string[];

  constructor(codigo: string | null, codEditora: number, titulo: string, resumo: string, autores: string[]) {
    this.codigo = codigo;
    this.codEditora = codEditora;
    this.titulo = titulo; // Mantido como 'titulo'
    this.resumo = resumo;
    this.autores = autores;
  }
}
