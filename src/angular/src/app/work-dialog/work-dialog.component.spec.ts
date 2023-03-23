import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkDialogComponent } from './work-dialog.component';

describe('WorkDialogComponent', () => {
  let component: WorkDialogComponent;
  let fixture: ComponentFixture<WorkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
