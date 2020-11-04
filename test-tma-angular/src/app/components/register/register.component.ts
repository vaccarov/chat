import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidators } from '../../tools/match-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    user: ['', [Validators.required]],
    password1: ['', [Validators.required]],
    password2: ['', Validators.required],
  }, {validator: CustomValidators.MatchPassword});
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  register() {
    this.authService.signUp(
      this.registerForm.get('user').value,
      this.registerForm.get('password1').value,
      this.registerForm.get('password2').value,
    ).subscribe(() => {
      this.router.navigateByUrl('chat');
    })
  }
}
