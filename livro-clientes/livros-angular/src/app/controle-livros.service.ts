import { Injectable } from '@angular/core';
import { Livro } from './livro';

const baseURL = 'http://localhost:3030/livros';

export interface LivroMongo {
  _id: string | null,
  titulo: string,
  codEditora: number,
  resumo: string,
  autores: string[],
}

@Injectable({
  providedIn: 'root',
})

export class ControleLivrosService {
  livros: any;

  constructor() { }

  async obterLivros() {
    const response = await fetch(baseURL);
    const data = await response.json();
    const livros = data.map((livro: LivroMongo) => new Livro(
        livro._id,
        livro.titulo,
        livro.codEditora,
        livro.resumo,
        livro.autores
    ));
    return livros;
}

  // Alterar o método incluir para comportamento assíncrono
  async incluir(livro: Livro): Promise<boolean> {
    const url = `${baseURL}`;

    const livroMongo: LivroMongo = {
      _id: null,
      titulo: livro.titulo,
      codEditora: livro.codEditora,
      resumo: livro.resumo,
      autores: livro.autores      
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroMongo),
      });

      return response.ok;
    } catch (error) {
      console.error('Erro ao incluir livro:', error);
      return false;
    }
  }

  // Alterar o método excluir para comportamento assíncrono
  async excluir(codigo: string | null): Promise<boolean> {
    const url = `${baseURL}/${codigo}`;

    try {
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
      return false;
    }
  }
  obterProximoCodigo(): number {
    // Verifique se há livros antes de mapear
    if (this.livros.length === 0) {
      return 1; // ou o valor inicial desejado
    }

    const codigos = this.livros.map((livro: { codigo: any }) => livro.codigo);
    const maiorCodigo = Math.max(...codigos);
    return maiorCodigo + 1;
  }

  getLivros() {
    const url = `${baseURL}/listar`;
    // Faça a chamada HTTP usando a URL
    // Retorne um Observable ou faça o que for necessário
  }
}
