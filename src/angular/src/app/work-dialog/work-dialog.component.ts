import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkService } from '../services/work/work.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-work-dialog',
  templateUrl: './work-dialog.component.html',
  styleUrls: ['./work-dialog.component.scss']
})
export class WorkDialogComponent implements OnInit {

  workForm !: FormGroup;

  workAction: string = 'Add';
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: WorkService,
    private dialogRef: MatDialogRef<WorkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    if (this.editData) {
      /** edit work experience **/
      this.workForm = this.formBuilder.group(
        {
          id: ['', Validators.required],  //id must be passed-in as part of the request to update
          company: ['', Validators.required],
          jobTitle: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.nullValidator],
          description: ['', Validators.required]
        }
      );

      this.workAction = 'Update';
      this.actionBtn = 'Update';
      this.workForm.controls['id'].setValue(this.editData.id);
      this.workForm.controls['company'].setValue(this.editData.company);
      this.workForm.controls['jobTitle'].setValue(this.editData.jobTitle);
      this.workForm.controls['startDate'].setValue(this.editData.startDate);
      this.workForm.controls['endDate'].setValue(this.editData.endDate);
      this.workForm.controls['description'].setValue(this.editData.description);
    } else {
      /** add new work experience **/
      this.workForm = this.formBuilder.group(
        {
          company: ['', Validators.required],
          jobTitle: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.nullValidator],
          description: ['', Validators.required]
        }
      );
    }
  }

  addWorkExperience() {
    if (!this.editData) {
      if (this.workForm.valid) {
        this.api.addWorkExperience(this.workForm.value)
          .subscribe(
            {
              next: (res) => {
                alert("Work experience added successfully");
                this.workForm.reset();
                this.dialogRef.close('save');
              },
              error: () => { alert("Error while adding the work experience") }
            }
          )
      } else {
        alert("Please make sure all required fields are input");
      }
    } else {
      if (this.workForm.valid) {
        this.updateWork();
      } else {
        alert("Please make sure all required fields are updated");
      }
    }
  }

  updateWork(){
    this.api.putWorkExperience(this.workForm.value, this.editData.id).subscribe(
      {
        next: (res) => {
          alert("Work experience updated successfully");
          this.workForm.reset();
          this.dialogRef.close('update');
        },
        error: () => { alert("Error while updating the work experience") }
      }
    );
  }

}
