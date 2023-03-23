import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EducationService } from '../services/education/education.service';

@Component({
  selector: 'app-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.scss']
})
export class EducationDialogComponent {
  educationForm !: FormGroup;

  educationAction: string = 'Add';
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: EducationService,
    private dialogRef: MatDialogRef<EducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    if (this.editData) {
      /** edit education **/
      this.educationForm = this.formBuilder.group(
        {
          id: ['', Validators.required],  //id must be passed-in as part of the request to update
          institute: ['', Validators.required],
          degree: ['', Validators.required],
          major: ['', Validators.required],
          startDate: ['', Validators.required],
          graduationDate: ['', Validators.nullValidator],
          description: ['', Validators.required]
        }
      );

      console.log(this.editData);

      this.educationAction = 'Update';
      this.actionBtn = 'Update';
      this.educationForm.controls['id'].setValue(this.editData.id);
      this.educationForm.controls['institute'].setValue(this.editData.institute);
      this.educationForm.controls['degree'].setValue(this.editData.degree);
      this.educationForm.controls['major'].setValue(this.editData.major);
      this.educationForm.controls['startDate'].setValue(this.editData.startDate);
      this.educationForm.controls['graduationDate'].setValue(this.editData.graduationDate);
      this.educationForm.controls['description'].setValue(this.editData.description);
    } else {
      /** add new education **/
      this.educationForm = this.formBuilder.group(
        {
          institute: ['', Validators.required],
          degree: ['', Validators.required],
          major: ['', Validators.required],
          startDate: ['', Validators.required],
          graduationDate: ['', Validators.nullValidator],
          description: ['', Validators.required]
        }
      );
    }
  }

  addEducation() {
    if (!this.editData) {
      if (this.educationForm.valid) {
        this.api.addEducation(this.educationForm.value)
          .subscribe(
            {
              next: (res) => {
                alert("Education added successfully");
                this.educationForm.reset();
                this.dialogRef.close('save');
              },
              error: () => { alert("Error while adding the education") }
            }
          )
      } else {
        alert("Please make sure all required fields are input");
      }
    } else {
      if (this.educationForm.valid) {
        this.updateEducation();
      } else {
        alert("Please make sure all required fields are updated");
      }
    }
  }

  updateEducation(){
    this.api.putEducation(this.educationForm.value, this.editData.id).subscribe(
      {
        next: (res) => {
          alert("Education updated successfully");
          this.educationForm.reset();
          this.dialogRef.close('update');
        },
        error: () => { alert("Error while updating the Education") }
      }
    );
  }
}
