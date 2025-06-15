import { Component, OnInit } from '@angular/core';
import { EnqueteService} from '../../services/enquete';
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

  constructor(private enqueteService: EnqueteService) { }

  ngOnInit(): void {
    this.enqueteService.getEnquetes()
      .subscribe(dados => {
        this.enquetes = dados;
      });
  }

  getTotalVotos(enquete: Enquete): number {
    return enquete.opcoes.reduce((soma, opcao) => soma + opcao.votos, 0);
  }

}
