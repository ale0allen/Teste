import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  livros: Livro[] = [];

  constructor(private controleLivrosService: ControleLivrosService) {}

  ngOnInit(): void {
    // Alterar a implementação do método ngOnInit
    this.controleLivrosService.obterLivros().then(livros => {
      this.livros = livros;
    });
  }

  // Alterar a assinatura do método excluir
  excluir(codigo: string | null): void {
    this.controleLivrosService.excluir(codigo)
      .then(() => {
        // Ao final da execução de excluir, chame obterLivros novamente
        return this.controleLivrosService.obterLivros();
      })
      .then(livros => {
        this.livros = livros;
      });
  }
}
