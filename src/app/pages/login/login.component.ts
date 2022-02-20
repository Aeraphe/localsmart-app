import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeaderNavService } from '../../shared/services/header-nav.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';

interface Person {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private appHeaderService: HeaderNavService,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appHeaderService.open();
  }

  onSubmit = async () => {
    let data: Person = this.loginForm.value;
    let response = await this.auth.loginFirebase(data.email, data.password);
    if (response.status) {
      this.router.navigate(['admin']);
    }
    console.log(response);
  };
}
