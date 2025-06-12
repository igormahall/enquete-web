import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnqueteList } from './enquete-list';

describe('EnqueteList', () => {
  let component: EnqueteList;
  let fixture: ComponentFixture<EnqueteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnqueteList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnqueteList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
