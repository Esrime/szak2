import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isRegistering = false;
  public isWorking = false;
  error: string = null;

  constructor(private router: Router, private as: AuthService) { }

  ngOnInit(): void {
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) { return; }
    const email = form.value.email;
    const password = form.value.password;
    // const username = form.value.username;
    const isTeacher = form.value.isTeacher;

    this.isWorking = true;

    if (this.isRegistering) {
      this.as.addUser(email, isTeacher ? "teacher" : "student");
      this.as.signup(email, password).subscribe(
        resp => {
          this.isWorking = false;
          this.as.setRole()
          this.router.navigate(['/'])
        },
        eresp => {
          this.error = "Something went wrong: " + eresp.error.error.message + "."
          console.log(eresp)
          this.isWorking = false;
        }
      );
    } else {
      this.as.login(email, password).subscribe(
        resp => {
          this.isWorking = false;
          this.as.setRole()
          this.router.navigate(['/'])
        },
        eresp => {
          this.error = "Something went wrong: " + eresp.error.error.message + "."
          console.log(eresp)
          this.isWorking = false;
        }
      );
    }

    form.reset();
  }

}
