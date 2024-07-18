import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkFutureDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }
        const usertime = new Date(value).getDate()
        const now = new Date().getDate()

        return now<usertime ? { future: true } : null;
    }
}