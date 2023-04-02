import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CertificateDialogComponent } from '../certificate-dialog/certificate-dialog.component';
import { EducationDialogComponent } from '../education-dialog/education-dialog.component';
import { AccessService } from '../services/access/access.service';
import { CertificateService } from '../services/certificate/certificate.service';
import { EducationService } from '../services/education/education.service';
import { SkillService } from '../services/skill/skill.service';
import { WorkService } from '../services/work/work.service';
import { SkillDialogComponent } from '../skill-dialog/skill-dialog.component';
import { WorkDialogComponent } from '../work-dialog/work-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title = 'Conrad Lee Resume';
  actionBtn: string = 'Login';
  loggedIn: boolean = false;

  displayedSkillColumns: string[] = ['skill', 'skillDescription', 'action'];
  skillDataSource !: MatTableDataSource<any>;

  displayedColumns: string[] = ['company', 'jobTitle', 'startDate', 'endDate', 'description', 'action'];
  dataSource !: MatTableDataSource<any>;

  displayedEducationColumns: string[] = ['institute', 'degree', 'major', 'startDate', 'graduationDate', 'description', 'action'];
  educationDataSource !: MatTableDataSource<any>;

  displayedCertificateColumns: string[] = ['certificateTitle', 'acquiredDate', 'expirationDate', 'description', 'action'];
  certificateDataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,
    private workApi: WorkService,
    private educationApi: EducationService,
    private certificateApi: CertificateService,
    private skillApi: SkillService,
    private accessService: AccessService
  ) {
    this.matIconRegistry.addSvgIcon(
      "linkedin_icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/linkedin_icon.svg")
    );
  }

  ngOnInit(): void {
    this.getAllSkills();
    this.getAllWorkExperiences();
    this.getAllEducations();
    this.getAllCertificates();

    this.accessService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      this.updateActionBtn();
    });
  }

  private updateActionBtn() {
    if (this.loggedIn) {
      this.actionBtn = 'Logout';
    } else {
      this.actionBtn = 'Login';
    }
  }

  /**
   * Logout Process
   */

  logout(){
    this.accessService.setLoggedIn(false);
    alert("Logged out");
    this.ngOnInit();
  }

  /** 
   * Skills Logic
   * */

   getAllSkills() {
    this.skillApi.getAllSkills()
      .subscribe(
        {
          next : (res) => { 
            this.skillDataSource = new MatTableDataSource(res);
            this.skillDataSource.paginator = this.paginator;
            this.skillDataSource.sort = this.sort;
          },
          error : () => { alert("Error while fetching the skill(s)") }
        }
      )
  }

  openSkillDialog(){
    this.dialog.open(SkillDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllSkills();
      }
    });
  }

  editSkill(row : any){
    this.dialog.open(SkillDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllSkills();
      }
    });
  }

  deleteSkill(id : number){
    this.skillApi.deleteSkill(id)
          .subscribe(
            {
              next: (res) => {
                alert("Skill deleted successfully");
                this.getAllSkills();
              },
              error: () => { alert("Error while deleting the skill") }
            }
          )
  }

  applySkillFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.skillDataSource.filter = filterValue.trim().toLowerCase();

    if (this.skillDataSource.paginator) {
      this.skillDataSource.paginator.firstPage();
    }
  }

  /** 
   * Work Experiences Logic
   * */

  getAllWorkExperiences() {
    this.workApi.getAllWorkExperiences()
      .subscribe(
        {
          next : (res) => { 
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error : () => { alert("Error while fetching the work experience(s)") }
        }
      )
  }

  openWorkDialog(){
    this.dialog.open(WorkDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllWorkExperiences();
      }
    });
  }

  editWork(row : any){
    this.dialog.open(WorkDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllWorkExperiences();
      }
    });
  }

  deleteWork(id : number){
    this.workApi.deleteWorkExperience(id)
          .subscribe(
            {
              next: (res) => {
                alert("Work experience deleted successfully");
                this.getAllWorkExperiences();
              },
              error: () => { alert("Error while deleting the work experience") }
            }
          )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** 
   * Education Logic 
   * */

  getAllEducations() {
    this.educationApi.getAllEducations()
      .subscribe(
        {
          next : (res) => { 
            this.educationDataSource = new MatTableDataSource(res);
            this.educationDataSource.paginator = this.paginator;
            this.educationDataSource.sort = this.sort;
          },
          error : () => { alert("Error while fetching the education(s)") }
        }
      )
  }

  openEducationDialog(){
    this.dialog.open(EducationDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllEducations();
      }
    });
  }

  editEducation(row : any){
    this.dialog.open(EducationDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllEducations();
      }
    });
  }

  deleteEducation(id : number){
    this.educationApi.deleteEducation(id)
          .subscribe(
            {
              next: (res) => {
                alert("Education deleted successfully");
                this.getAllEducations();
              },
              error: () => { alert("Error while deleting the education") }
            }
          )
  }

  applyEducationFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.educationDataSource.filter = filterValue.trim().toLowerCase();

    if (this.educationDataSource.paginator) {
      this.educationDataSource.paginator.firstPage();
    }
  }

  /** 
   * Certificate Logic 
   * */

   getAllCertificates() {
    this.certificateApi.getAllCertificates()
      .subscribe(
        {
          next : (res) => { 
            this.certificateDataSource = new MatTableDataSource(res);
            this.certificateDataSource.paginator = this.paginator;
            this.certificateDataSource.sort = this.sort;
          },
          error : () => { alert("Error while fetching the certificate(s)") }
        }
      )
  }

  openCertificateDialog(){
    this.dialog.open(CertificateDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllCertificates();
      }
    });
  }

  editCertificate(row : any){
    this.dialog.open(CertificateDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllCertificates();
      }
    });
  }

  deleteCertificate(id : number){
    this.certificateApi.deleteCertificate(id)
          .subscribe(
            {
              next: (res) => {
                alert("Certificate deleted successfully");
                this.getAllCertificates();
              },
              error: () => { alert("Error while deleting the certificate") }
            }
          )
  }

  applyCertificateFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.certificateDataSource.filter = filterValue.trim().toLowerCase();

    if (this.certificateDataSource.paginator) {
      this.certificateDataSource.paginator.firstPage();
    }
  }
}
