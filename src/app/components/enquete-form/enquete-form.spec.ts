import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnqueteForm } from './enquete-form';

describe('EnqueteForm', () => {
  let component: EnqueteForm;
  let fixture: ComponentFixture<EnqueteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnqueteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnqueteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
