import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkAge(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }
        const userBirthYear = new Date(value).getFullYear()
        const now = new Date().getFullYear()

        return (now - userBirthYear) < 18 ? { invalidAge: true } : null;
    }
}