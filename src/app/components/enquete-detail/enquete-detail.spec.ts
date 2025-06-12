import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnqueteDetail } from './enquete-detail';

describe('EnqueteDetail', () => {
  let component: EnqueteDetail;
  let fixture: ComponentFixture<EnqueteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnqueteDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnqueteDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
