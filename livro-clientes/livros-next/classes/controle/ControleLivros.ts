// clientes/livros-react/src/controle/ControleLivros.ts

import Livro from '../modelo/Livro';
import LivroMongo from '../Interface/LivroMongo';

const baseURL = 'http://localhost:3030/livros';

class ControleLivro {
  async obterLivros(): Promise<Array<Livro>> {
    try {
      const response = await fetch(baseURL);
      const livrosMongo: Array<LivroMongo> = await response.json();
      const livros = livrosMongo.map(livroMongo => {
        return new Livro(
          livroMongo._id,
          livroMongo.codEditora,
          livroMongo.titulo,
          livroMongo.resumo,
          livroMongo.autores,
        );
      });
      return livros;
    } catch (error) {
      throw new Error('Erro ao obter os livros: ' + (error as Error).message);
    }
  }

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
      console.error('teste:', livroMongo);
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


  async excluir(codigo: string): Promise<void> {
    try {
      const response = await fetch(`${baseURL}/${codigo}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir o livro.');
      }
    } catch (error) {
      throw new Error('Erro ao excluir o livro: ' + (error as Error).message);
    }
  }
}

export default ControleLivro;
