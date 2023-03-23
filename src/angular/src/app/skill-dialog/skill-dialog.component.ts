import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SkillService } from '../services/skill/skill.service';

@Component({
  selector: 'app-skill-dialog',
  templateUrl: './skill-dialog.component.html',
  styleUrls: ['./skill-dialog.component.scss']
})
export class SkillDialogComponent {
  skillForm !: FormGroup;

  skillAction: string = 'Add';
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: SkillService,
    private dialogRef: MatDialogRef<SkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    if (this.editData) {
      /** edit skill **/
      this.skillForm = this.formBuilder.group(
        {
          id: ['', Validators.required],  //id must be passed-in as part of the request to update
          skill: ['', Validators.required],
          skillDescription: ['', Validators.required]
        }
      );

      console.log(this.editData);

      this.skillAction = 'Update';
      this.actionBtn = 'Update';
      this.skillForm.controls['id'].setValue(this.editData.id);
      this.skillForm.controls['skill'].setValue(this.editData.skill);
      this.skillForm.controls['skillDescription'].setValue(this.editData.skillDescription);
    } else {
      /** add new certificate **/
      this.skillForm = this.formBuilder.group(
        { 
          skill: ['', Validators.required],
          skillDescription: ['', Validators.required]
        }
      );
    }
  }

  addSkill() {
    console.log(this.skillForm.value);

    if (!this.editData) {
      if (this.skillForm.valid) {
        this.api.addSkill(this.skillForm.value)
          .subscribe(
            {
              next: (res) => {
                alert("Skill added successfully");
                this.skillForm.reset();
                this.dialogRef.close('save');
              },
              error: () => { alert("Error while adding the skill") }
            }
          )
      } else {
        alert("Please make sure all required fields are input");
      }
    } else {
      if (this.skillForm.valid) {
        this.updateSkill();
      } else {
        alert("Please make sure all required fields are updated");
      }
    }
  }

  updateSkill(){
    this.api.putSkill(this.skillForm.value, this.editData.id).subscribe(
      {
        next: (res) => {
          alert("Skill updated successfully");
          this.skillForm.reset();
          this.dialogRef.close('update');
        },
        error: () => { alert("Error while updating the Skill") }
      }
    );
  }

}
