import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EnqueteService } from '../../services/enquete';
import { Enquete } from '../../models/enquete.model';
import { NotificationService } from '../../services/notification';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enquete-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './enquete-detail.html',
  styleUrls: ['./enquete-detail.css']
})
export class EnqueteDetailComponent implements OnInit {
  enquete: Enquete | undefined;
  isVoting = false;
  participantName: string = '';

  constructor(
    private route: ActivatedRoute,
    private enqueteService: EnqueteService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log('--- RASTREAMENTO DE EXECUÇÃO ---');
    this.carregarEnquete();
  }

  carregarEnquete(): void {
    console.log('1. Método carregarEnquete() foi chamado.');
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('2. Parâmetro "id" lido da URL:', idParam);

    if (idParam) {
      console.log('3. O parâmetro "id" existe. Tentando converter para número.');
      const id = +idParam;
      console.log('4. O "id" convertido é:', id);

      this.enqueteService.getEnqueteById(id).subscribe({
        next: (dados) => {
          console.log('5. SUCESSO! Dados recebidos da API:', dados);
          this.enquete = dados;
        },
        error: (err) => {
          console.error('5. ERRO! Falha ao carregar detalhes da enquete:', err);
          this.notificationService.show('Não foi possível carregar a enquete.', 'error');
        }
      });
    } else {
      console.error('3. ERRO CRÍTICO: O parâmetro "id" não foi encontrado na URL. Verifique o arquivo app.routes.ts.');
    }
  }

  // ... (métodos votar, voltar, isMaxVotos continuam os mesmos)
  votar(opcaoId: number): void {
    if (!this.participantName) {
      this.notificationService.show('Por favor, digite seu nome para votar.', 'error');
      return;
    }

    if (this.enquete && !this.isVoting) {
      this.isVoting = true;
      this.enqueteService.votar(this.enquete.id, opcaoId, this.participantName.trim())
        .subscribe({
          next: () => {
            this.notificationService.show('Voto computado com sucesso!');
            this.carregarEnquete();
            this.isVoting = false;
          },
          error: (err) => {
            this.notificationService.show(err.error?.error || 'Ocorreu um erro desconhecido.', 'error');
            this.isVoting = false;
          }
        });
    }
  }


  isMaxVotos(votos: number): boolean {
    if (!this.enquete || votos === 0) {
      return false;
    }
    const maxVotos = Math.max(...this.enquete.opcoes.map(o => o.votos));
    return votos === maxVotos;
  }
}
