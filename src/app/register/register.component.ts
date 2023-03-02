import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
// import {ConfirmedValidator} from '../app-routing.module';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm !: FormGroup;
  

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      username:['',[Validators.required, Validators.minLength(3)]],
      mobile:['',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      // confirmPassword:['',Validators.required],
      // {validator: ConfirmedValidator('password', 'confirmPassword')
    })
    
  // }
  }
  register(){
    // if (this.registerForm.valid)
// const params =this.registerForm.value;
// params.mobile =+ params.mobile;
// params.password =+ params.password
// params.id = 'jhvjhbh'
    this.http.post<any>("https://localhost:7072/api/SignUp",this.registerForm.value)
    .subscribe(res=>{
      // alert('register Successfull');
      this.registerForm.reset();
      this.router.navigate(['login'])
    }, err=>{
      alert("something went wrong")
    })

  }
  numericOnly(event:any):boolean{
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

}
