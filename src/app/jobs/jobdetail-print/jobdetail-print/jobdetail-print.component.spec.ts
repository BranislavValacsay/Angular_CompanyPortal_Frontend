import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdetailPrintComponent } from './jobdetail-print.component';

describe('JobdetailPrintComponent', () => {
  let component: JobdetailPrintComponent;
  let fixture: ComponentFixture<JobdetailPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobdetailPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobdetailPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
