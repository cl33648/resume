import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CertificateService } from '../services/certificate/certificate.service';

@Component({
  selector: 'app-certificate-dialog',
  templateUrl: './certificate-dialog.component.html',
  styleUrls: ['./certificate-dialog.component.scss']
})
export class CertificateDialogComponent {
  certificateForm !: FormGroup;

  certificateAction: string = 'Add';
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: CertificateService,
    private dialogRef: MatDialogRef<CertificateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    if (this.editData) {
      /** edit certificate **/
      this.certificateForm = this.formBuilder.group(
        {
          id: ['', Validators.required],  //id must be passed-in as part of the request to update
          certificateTitle: ['', Validators.required],
          acquiredDate: ['', Validators.required],
          expirationDate: ['', Validators.nullValidator],
          description: ['', Validators.required]
        }
      );

      console.log(this.editData);

      this.certificateAction = 'Update';
      this.actionBtn = 'Update';
      this.certificateForm.controls['id'].setValue(this.editData.id);
      this.certificateForm.controls['certificateTitle'].setValue(this.editData.certificateTitle);
      this.certificateForm.controls['acquiredDate'].setValue(this.editData.acquiredDate);
      this.certificateForm.controls['expirationDate'].setValue(this.editData.expirationDate);
      this.certificateForm.controls['description'].setValue(this.editData.description);
    } else {
      /** add new certificate **/
      this.certificateForm = this.formBuilder.group(
        { 
          certificateTitle: ['', Validators.required],
          acquiredDate: ['', Validators.required],
          expirationDate: ['', Validators.nullValidator],
          description: ['', Validators.required]
        }
      );
    }
  }

  addCertificate() {
    console.log(this.certificateForm.value);

    if (!this.editData) {
      if (this.certificateForm.valid) {
        this.api.addCertificate(this.certificateForm.value)
          .subscribe(
            {
              next: (res) => {
                alert("Certificate added successfully");
                this.certificateForm.reset();
                this.dialogRef.close('save');
              },
              error: () => { alert("Error while adding the certificate") }
            }
          )
      } else {
        alert("Please make sure all required fields are input");
      }
    } else {
      if (this.certificateForm.valid) {
        this.updateCertificate();
      } else {
        alert("Please make sure all required fields are updated");
      }
    }
  }

  updateCertificate(){
    this.api.putCertificate(this.certificateForm.value, this.editData.id).subscribe(
      {
        next: (res) => {
          alert("Certificate updated successfully");
          this.certificateForm.reset();
          this.dialogRef.close('update');
        },
        error: () => { alert("Error while updating the Certificate") }
      }
    );
  }

}
