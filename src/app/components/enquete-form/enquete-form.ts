import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EnqueteService } from '../../services/enquete';
import { NotificationService } from '../../services/notification';
import { Enquete } from '../../models/enquete.model'; // Importe o modelo Enquete

@Component({
  selector: 'app-enquete-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './enquete-form.html',
  styleUrls: ['./enquete-form.css']
})
export class EnqueteFormComponent implements OnInit {
  enqueteForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private enqueteService: EnqueteService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.enqueteForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      opcoes: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ], [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {}

  get opcoes(): FormArray {
    return this.enqueteForm.get('opcoes') as FormArray;
  }

  addOpcao(): void {
    this.opcoes.push(this.fb.control('', Validators.required));
  }

  removeOpcao(index: number): void {
    this.opcoes.removeAt(index);
  }

  onSubmit(): void {
    if (this.enqueteForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    const payload = {
      titulo: this.enqueteForm.value.titulo,
      opcoes_input: this.enqueteForm.value.opcoes.filter((opcao: string) => opcao)
    };

    this.enqueteService.createEnquete(payload).subscribe({
      // CORRIGIDO: Adicionado o tipo para 'novaEnquete'
      next: (novaEnquete: Enquete) => {
        this.notificationService.show('Enquete criada com sucesso!');
        this.isSubmitting = false;
        this.router.navigate(['/enquetes', novaEnquete.id]);
      },
      // CORRIGIDO: Adicionado o tipo 'any' para 'err'
      error: (err: any) => {
        this.notificationService.show('Ocorreu um erro ao criar a enquete.', 'error');
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }
}
