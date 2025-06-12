// src/app/components/enquete-form/enquete-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EnqueteService} from '../../services/enquete';

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
    private router: Router
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

  // Getter para acessar o FormArray de opções facilmente no template
  get opcoes(): FormArray {
    return this.enqueteForm.get('opcoes') as FormArray;
  }

  // Adiciona um novo campo de opção ao formulário
  addOpcao(): void {
    this.opcoes.push(this.fb.control('', Validators.required));
  }

  // Remove uma opção pelo seu índice
  removeOpcao(index: number): void {
    this.opcoes.removeAt(index);
  }

  // Lida com o envio do formulário
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
      next: (novaEnquete) => {
        alert('Enquete criada com sucesso!');
        this.isSubmitting = false;
        this.router.navigate(['/enquetes', novaEnquete.id]);
      },
      error: (err) => {
        alert('Ocorreu um erro ao criar a enquete.');
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }
}
