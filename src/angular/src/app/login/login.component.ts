import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from '../services/access/access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private accessService: AccessService){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],  
        password: ['', Validators.required]
      }
    );
  }

  loginUser() {
    console.log(this.loginForm.value);

    this.accessService.getUser()
    .subscribe(
      {
        next: (res) => {
          const user = res.find((a:any) => {
            return a.username === this.loginForm.value.username && 
                    a.password === this.loginForm.value.password
          });
          if(user){
            alert("Login Success");
            this.accessService.setLoggedIn(true);
            console.log("loggedIn set true from LoginComponent loginUser() ");
            this.loginForm.reset();
            this.router.navigate(['']);
          } else {
            alert("User not found");
          }
        },
        error: () => { alert("Unable to log in") }
      }
    );
  }
}
