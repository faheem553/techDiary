import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';
import { DataService } from './../service/data.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService,
    private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }
  login() {
    this.http.get<any>("https://localhost:7072/api/SignUp")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
        });
        if (user) {
          // alert('login is successfull');
          this.loginForm.reset();
          this.router.navigate(['home']);
          localStorage.setItem('loggedInUser', JSON.stringify(user))
          this.dataService.userStatus(true)

        } else {
          alert('user not found');
        }

      }, err => {
        alert("somthing went wrong")
      })

  }

}
