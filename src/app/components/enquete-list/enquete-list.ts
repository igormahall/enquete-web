import { Component, OnInit } from '@angular/core';
import { EnqueteService } from '../../services/enquete';
import { Enquete } from '../../models/enquete.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enquete-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enquete-list.html',
  styleUrls: ['./enquete-list.css']
})
export class EnqueteListComponent implements OnInit {
  enquetes: Enquete[] = [];
  carregando = true;
  erro: string | null = null;

  constructor(private readonly enqueteService: EnqueteService) {}

  ngOnInit(): void {
    this.carregarEnquetes();
  }

  private carregarEnquetes(): void {
    this.enqueteService.getEnquetes().subscribe({
      next: (dados: Enquete[]) => {
        // Mantém apenas enquetes válidas (Aberta ou Encerrada)
        this.enquetes = dados.filter(
          e => e.status === 'Aberta' || e.status === 'Encerrada'
        );
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar enquetes:', err);
        this.erro = 'Erro ao carregar enquetes. Tente novamente mais tarde.';
        this.carregando = false;
      }
    });
  }

  getTotalVotos(enquete: Enquete): number {
    if (!Array.isArray(enquete.opcoes)) return 0;
    return enquete.opcoes.reduce((soma, opcao) => soma + (opcao.votos || 0), 0);
  }
}
