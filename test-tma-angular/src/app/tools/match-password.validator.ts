import { AbstractControl } from '@angular/forms';

export class CustomValidators {

  static MatchPassword(form: AbstractControl) {
    const password1: AbstractControl = form.get('password1');
    const password2: AbstractControl = form.get('password2');
    if (password1.value !== password2.value) {
      password2.setErrors({MatchPassword: true});
    } else {
      password2.setErrors(null);
      return null;
    }
  }
}
