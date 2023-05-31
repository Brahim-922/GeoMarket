import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;

  constructor(private formBuilder:  FormBuilder, private router:Router) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:[''],
      email:[''],
      password:[''],
      tel:['']
    })
  }
  signUp(){
 this.signupForm.value.suscribe(()=>{
  alert("Connexion avec succès");
  this.signupForm.reset();
  this.router.navigate(['login']);
}, (_err: any)=>{
  alert("Oups")
})

  }
}
