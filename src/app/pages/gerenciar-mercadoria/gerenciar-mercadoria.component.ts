import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MercadoriaService } from '../../services/mercadoria.service';
import { MercadoriaResponse } from '../../types/mercadoria-response.type';

interface NovaMercadoria {
  nome: string;
  preco: number;
  quantidade: number;
  habilitado: boolean;
}

@Component({
  selector: 'app-gerenciar-mercadoria',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
  templateUrl: './gerenciar-mercadoria.component.html',
  styleUrls: ['./gerenciar-mercadoria.component.scss']
})
export class GerenciarMercadoriaComponent implements OnInit {
  mercadoriaEditada: MercadoriaResponse | null = null;
  mercadorias: MercadoriaResponse[] = [];
  loading = true;
  error = '';

  novaMercadoria: NovaMercadoria = {
    nome: '',
    preco: 0,
    quantidade: 0,
    habilitado: true
  };
  mostrarFormularioAdicionar = false;
  editandoId: number | null = null;
  idParaExcluir: number | null = null;

  constructor(private mercadoriaService: MercadoriaService) {}

  ngOnInit() {
    this.carregarMercadorias();
  }

  carregarMercadorias() {
    this.loading = true;
    this.mercadoriaService.obterMercadorias().subscribe({
      next: (data) => {
        this.mercadorias = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar mercadorias.';
        this.loading = false;
      }
    });
  }

  adicionarMercadoria() {
    this.mercadoriaService.adicionarMercadoria(this.novaMercadoria as MercadoriaResponse).subscribe({
      next: () => {
        this.novaMercadoria = { nome: '', preco: 0, quantidade: 0, habilitado: true };
        this.fecharFormularioAdicionar();
        this.carregarMercadorias();
      },
      error: () => {
        this.error = 'Erro ao adicionar mercadoria.';
      }
    });
  }

  salvarEdicao(mercadoria: MercadoriaResponse) {
    this.mercadoriaService.atualizarMercadoria(mercadoria.id, mercadoria).subscribe({
      next: () => {
        this.editandoId = null;
        this.mercadoriaEditada = null;
        this.carregarMercadorias();
      },
      error: () => {
        this.error = 'Erro ao atualizar mercadoria.';
      }
    });
  }

  toggleHabilitado(mercadoria: MercadoriaResponse) {
  this.mercadoriaService.atualizarMercadoria(mercadoria.id, {
    ...mercadoria,
    habilitado: mercadoria.habilitado
  }).subscribe({
    next: () => this.carregarMercadorias(),
    error: () => this.error = 'Erro ao atualizar status da mercadoria.'
  });
}


  abrirFormularioAdicionar() {
    this.mostrarFormularioAdicionar = true;
  }

  fecharFormularioAdicionar() {
    this.mostrarFormularioAdicionar = false;
    this.novaMercadoria = { nome: '', preco: 0, quantidade: 0, habilitado: true };
  }

  editarMercadoria(mercadoria: MercadoriaResponse) {
    this.editandoId = mercadoria.id;
    this.mercadoriaEditada = { ...mercadoria };
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.mercadoriaEditada = null;
    this.carregarMercadorias();
  }

  confirmarExclusao(id: number) {
    this.idParaExcluir = id;
  }

  excluirMercadoria(id: number) {
    this.mercadoriaService.excluirMercadoria(id).subscribe({
      next: () => {
        this.carregarMercadorias();
        this.idParaExcluir = null;
      },
      error: () => {
        this.error = 'Erro ao excluir mercadoria.';
        this.idParaExcluir = null;
      }
    });
  }

  ajustarPreco(mercadoria: MercadoriaResponse, tipo: 'mais' | 'menos') {
    let novoPreco = mercadoria.preco;
    if (tipo === 'mais') {
      // Se termina em .49, vai para .99, senão soma 1 e vai para .49
      if (Number((novoPreco % 1).toFixed(2)) === 0.49) {
        novoPreco = Math.floor(novoPreco) + 0.99;
      } else {
        novoPreco = Math.floor(novoPreco + 1) + 0.49;
      }
    } else {
      // Se termina em .99, vai para .49, senão diminui 1 e vai para .99
      if (Number((novoPreco % 1).toFixed(2)) === 0.99) {
        novoPreco = Math.floor(novoPreco) + 0.49;
      } else {
        novoPreco = Math.max(0, Math.floor(novoPreco - 1) + 0.99);
      }
    }
    this.mercadoriaService.atualizarMercadoria(mercadoria.id, { ...mercadoria, preco: Number(novoPreco.toFixed(2)) }).subscribe({
      next: () => this.carregarMercadorias(),
      error: () => this.error = 'Erro ao atualizar preço.'
    });
  }

  ajustarQuantidade(mercadoria: MercadoriaResponse, tipo: 'mais' | 'menos') {
    let novaQuantidade = mercadoria.quantidade;
    if (tipo === 'mais') {
      novaQuantidade += 1;
    } else {
      novaQuantidade = Math.max(0, novaQuantidade - 1);
    }
    this.mercadoriaService.atualizarMercadoria(mercadoria.id, { ...mercadoria, quantidade: novaQuantidade }).subscribe({
      next: () => this.carregarMercadorias(),
      error: () => this.error = 'Erro ao atualizar quantidade.'
    });
  }
}
