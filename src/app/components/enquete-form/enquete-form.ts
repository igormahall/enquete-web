import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EnqueteService } from '../../services/enquete';
import { NotificationService } from '../../services/notification';
import { Enquete } from '../../models/enquete.model';

@Component({
  selector: 'app-enquete-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './enquete-form.html',
  styleUrls: ['./enquete-form.css']
})
export class EnqueteFormComponent implements OnInit {
  enqueteForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private enqueteService: EnqueteService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.enqueteForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      opcoes: this.fb.array<FormControl>(
        [this.fb.control('', Validators.required), this.fb.control('', Validators.required)],
        [Validators.minLength(2)]
      ),
      duracao_horas: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get opcoes(): FormArray<FormControl> {
    return this.enqueteForm.get('opcoes') as FormArray<FormControl>;
  }

  addOpcao(): void {
    if (this.opcoes.length >= 10) {
      this.notificationService.show('Limite de 10 opções atingido.', 'warning');
      return;
    }
    this.opcoes.push(this.fb.control('', Validators.required));
  }

  removeOpcao(index: number): void {
    if (this.opcoes.length <= 2) {
      this.notificationService.show('Uma enquete deve ter pelo menos 2 opções.', 'warning');
      return;
    }
    this.opcoes.removeAt(index);
  }

  onSubmit(): void {
    if (this.enqueteForm.invalid) {
      this.enqueteForm.markAllAsTouched();
      this.notificationService.show('Preencha todos os campos obrigatórios corretamente.', 'error');
      return;
    }

    this.isSubmitting = true;

    const payload = {
      titulo: this.enqueteForm.value.titulo,
      duracao_horas: this.enqueteForm.value.duracao_horas,
      opcoes_input: this.opcoes.value.map(op => op.trim()).filter(op => op !== '')
    };

    this.enqueteService.createEnquete(payload).subscribe({
      next: (novaEnquete: Enquete) => {
        this.notificationService.show('Enquete criada com sucesso!');
        this.router.navigate(['/enquetes', novaEnquete.id]);
      },
      error: (err: any) => {
        console.error('Erro ao criar enquete:', err);
        this.notificationService.show(
          err?.error?.detail || 'Ocorreu um erro ao criar a enquete.',
          'error'
        );
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }

  isTouchedAndInvalid(index: number): boolean {
    const control = this.opcoes.at(index);
    return control.touched && control.invalid;
  }

}
