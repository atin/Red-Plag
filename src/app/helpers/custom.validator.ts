import { FormGroup } from '@angular/forms';

export function mustMatch(pass: string, confirm: string) {
  return (fg: FormGroup) => {
    const pass_control = fg.controls[pass];
    const confirm_control = fg.controls[confirm];

    if (pass_control.errors) {
      return;
    }

    if (pass_control.value !== confirm_control.value) {
      confirm_control.setErrors({ mustMatch: true });
    } else {
      confirm_control.setErrors(null);
    }
  };
}