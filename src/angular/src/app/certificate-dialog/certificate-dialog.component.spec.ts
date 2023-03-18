import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDialogComponent } from './certificate-dialog.component';

describe('CertificateDialogComponent', () => {
  let component: CertificateDialogComponent;
  let fixture: ComponentFixture<CertificateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
