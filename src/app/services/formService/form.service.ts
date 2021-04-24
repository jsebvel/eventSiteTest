import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  /**
   *
   * @returns Returns a list with all patterns
   */
  getAllPatterns() {
    return {
      onlyLettersPattern: "^[A-Za-zÀ-ÿ ]+$",
      alphanumericPatter: "^[A-Za-zÀ-ÿ-0-9 .]+$",
      emailPattern:
        "[ÑA-Zña-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})",
      numericPattern: "^[0-9]+$",
      cellphonePattern: "^[3][0-9]+$",
      otherPatter: '^[A-Za-zÀ-ÿ .]+$',
      alphaNumWithSpacPattern: '^[A-Za-z0-9 ]+$',
      numericWithDashPattern: '^[0-9-]+$',
      alphanumericWithDashPattern: '^[A-Za-zÀ-ÿ-0-9-]+$',
    };
  }

  /**
   * @description Return a generic and common validation
   */
  get defaultNameValidator() {
    const patterns = this.getAllPatterns();
    return [Validators.required, Validators.minLength(3), Validators.pattern(patterns.onlyLettersPattern)]
  }

  /**
   *
   * @param field Field name with to verify if it has an error.
   * @param formGroup Form group who contains the field
   * @returns {string} Error message if field has any error.
   */
  getError(field: string, formGroup: FormGroup) {
    if (formGroup.get(field).hasError('required')) {
      return 'El campo es requerido';
    }
    else if (formGroup.get(field).hasError('pattern')) {
      return 'Los caracteres ingresados no son válidos para este campo';
    }
    else if (formGroup.get(field).hasError('min')) {
      return 'El valor está por debajo del valor mínimo permitido';
    }
    else if (formGroup.get(field).hasError('max')) {
      return 'El valor ingresado supera el valor máximo permitido';
    }
    else if (formGroup.get(field).hasError('minlength')) {
      return 'El campo tiene menos caracteres de los requeridos';
    }
    else if (formGroup.get(field).hasError('maxlength')) {
      return 'El campo supera el número máximo de caracteres permitidos';
    }
    else if (formGroup.get(field).hasError('email')) {
      return `El formato para ${field} es incorrecto`;
    } else if (formGroup.get(field).hasError('notMatch')) {
      return 'Las contraseñas no coinciden';
    }

    else {
      return true;
    }
  }
}
