import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class EnqueteDetailComponent implements OnInit, OnDestroy {
  enquete: Enquete | undefined;
  isVoting = false;
  participantName: string = '';
  tempoRestante: string = '';
  tempoCritico: boolean = false;
  private timerInterval: any;

  constructor(
    private route: ActivatedRoute,
    private enqueteService: EnqueteService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.carregarEnquete();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  carregarEnquete(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.enqueteService.getEnqueteById(id).subscribe({
        next: (dados) => {
          this.enquete = dados;
          this.atualizarTempoRestante();
          this.iniciarContador();
        },
        error: () => {
          this.notificationService.show('Não foi possível carregar a enquete.', 'error');
        }
      });
    } else {
      this.notificationService.show('Enquete inválida.', 'error');
    }
  }

  iniciarContador(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.atualizarTempoRestante();
    }, 60000); // Atualiza a cada 60 segundos
  }

  atualizarTempoRestante(): void {
    if (!this.enquete || this.enquete.status !== 'Aberta') {
      this.tempoRestante = '';
      this.tempoCritico = false;
      return;
    }

    const agora = new Date();
    const expira = new Date(this.enquete.expires_at);
    const diffMs = expira.getTime() - agora.getTime();


    if (diffMs <= 0) {
      this.tempoRestante = 'Expirada há poucos instantes.';
      this.tempoCritico = false;
      return;
    }

    const diffMin = Math.floor(diffMs / 60000);
    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;

    this.tempoRestante = horas > 0
      ? `Tempo restante: ${horas}h ${minutos}min`
      : `Tempo restante: ${minutos}min`;

    this.tempoCritico = diffMin <= 5;
  }

  votar(opcaoId: number): void {
    this.participantName = this.participantName.trim();

    if (!this.participantName) {
      this.notificationService.show('Por favor, digite seu nome para votar.', 'error');
      return;
    }

    if (this.enquete?.status !== 'Aberta') {
      this.notificationService.show('Esta enquete está encerrada.', 'error');
      return;
    }

    if (this.enquete && !this.isVoting) {
      this.isVoting = true;
      this.enqueteService.votar(this.enquete.id, opcaoId, this.participantName)
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

  trackByOpcaoId(index: number, opcao: any): number {
    return opcao.id;
  }
}
