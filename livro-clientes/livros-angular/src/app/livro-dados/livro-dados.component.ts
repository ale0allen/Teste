import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Livro } from '../livro';
import { Editora } from '../editora';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css'],
})
export class LivroDadosComponent implements OnInit {
  livro: Livro;
  autoresForm: string = '';
  editoras: Array<Editora> = [];
  editoraSelecionada: Editora | null = null;

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {
    this.livro = new Livro('','',0, '', []);
  }

  ngOnInit() {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir(): void {
    // Chame o método incluir do controlador
    this.servLivros.incluir(this.livro)
      .then(() => {
        // Ao término da execução do método incluir, navegue para "/lista"
        this.router.navigateByUrl('/lista');
      });
  }
}
