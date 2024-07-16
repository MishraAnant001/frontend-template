import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService, UserService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  submitted = false
  constructor(private fb: FormBuilder, private service: UserService, private router: Router, private storageService: StorageService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  onSubmit() {
    this.submitted = true
    if (this.form.valid) {
      console.log(this.form.value);
      const remember = this.form.controls['remember'].value
      // console.log(remember);
      this.service.loginUser(this.form.value).subscribe({
        next: (response: any) => {
          // console.log(response);
          Swal.fire({
            icon: "success",
            title: "login successfull",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.storageService.clear()
            this.storageService.setToken(response.body.data.token, remember)
            this.storageService.setRole(response.body.data.user.role)
            this.storageService.setName(response.body.data.user.name)
            this.storageService.setUser(response.body.data.user)
            this.router.navigateByUrl("")
          })
        },
        error: (error: any) => {
          console.log(error);
          if ((error.message as string).includes("Http failure response")) {
            console.log("dshgvgfhvg");
            Swal.fire("Oops", "Server not responding", "error")
          }
          else {
            Swal.fire({
              icon: "error",
              title: "Oops..",
              text: `${error.error.message}`
            })
          }
        }
      })
    }
  }

  get f() {
    return this.form.controls
  }

}
