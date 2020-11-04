import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    'user': ['', Validators.required],
    'password': ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isConnected())
      this.router.navigateByUrl('chat')
  }

  login() {
    this.authService.signIn(
      this.loginForm.get('user').value,
      this.loginForm.get('password').value
    ).subscribe(() =>
      this.router.navigateByUrl('chat')
    );
  }

}
