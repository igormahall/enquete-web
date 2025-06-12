import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router'; // 1. Importe o ActivatedRoute
import { EnqueteService } from '../../services/enquete'; // 2. Importe o Serviço
import { Enquete } from '../../models/enquete.model'; // 3. Importe o Modelo

@Component({
  selector: 'app-enquete-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enquete-detail.html',
  styleUrls: ['./enquete-detail.css']
})

export class EnqueteDetailComponent implements OnInit {
  // Propriedade para guardar os dados da enquete. Pode ser undefined antes de carregar.
  enquete: Enquete | undefined;
  isVoting = false;

  // 4. Injete o ActivatedRoute e o EnqueteService
  constructor(
    private route: ActivatedRoute,
    private enqueteService: EnqueteService
  ) {}

  ngOnInit(): void {
    this.carregarEnquete();
  }

  carregarEnquete(): void {
    // 5. Pega o 'id' da URL (ex: de /enquetes/1, pega o "1")
    const idParam = this.route.snapshot.paramMap.get('id');

    // Verifica se o ID não é nulo
    if (idParam) {
      const id = +idParam; // O '+' converte a string '1' para o número 1
      this.enqueteService.getEnqueteById(id).subscribe(dados => {
        this.enquete = dados;
      });
    }
  }

  votar(opcaoId: number): void {
    // Garante que temos uma enquete carregada antes de tentar votar
    if (this.enquete && !this.isVoting) {
      this.isVoting = true; // <-- Ativa o estado de "votando"

      this.enqueteService.votar(this.enquete.id, opcaoId)
        .subscribe({
          next: (enqueteAtualizada) => {
            // Sucesso! Atualiza os dados na tela com a resposta da API.
            this.enquete = enqueteAtualizada;
            this.isVoting = false; // <-- Desativa ao obter sucesso
          },
          error: (err) => {
            // Erro! Exibe a mensagem de erro da API (ex: "Já votou").
            console.error('Objeto de erro completo da API:', err);
            const mensagem = err.error?.error || 'Ocorreu um erro desconhecido ao tentar votar.';
            alert(mensagem);
            this.isVoting = false; // <-- Desativa também em caso de erro
          }
        });
    }
  }
}
