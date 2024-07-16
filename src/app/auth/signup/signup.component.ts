import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  form!:FormGroup
  submitted=false
  constructor(private fb:FormBuilder,private service:UserService,private router :Router) { }
  ngOnInit(): void {
    this.form=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]],
    })
  }

  onSubmit(){
    this.submitted=true
    if(this.form.valid){
      console.log(this.form.value);
      this.service.signupUser(this.form.value).subscribe({
        next:(response)=>{
          Swal.fire({
            icon: "success",
            title: "user registered successfully",
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            this.router.navigateByUrl("/auth/login")
          });
        },
        error:(error:any)=>{
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text:`${error.error.message}`
          })
        }
      })

    }
  }

  get f(){
    return this.form.controls
  }


}
