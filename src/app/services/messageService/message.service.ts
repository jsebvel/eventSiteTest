import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private _router: Router
  ) { }

  loginMessages(loginResponse) {
    let responseIcon;
    let responseMessage;
    if (loginResponse?.code?.includes('auth')) {
      responseIcon = 'error';
      responseMessage = 'Correo o contraseña incorrecto';
    } else {
      responseIcon = 'success',
      responseMessage = '¡Bienvenido!'
    }
    swal.fire({
      icon: responseIcon,
      text: responseMessage
    });
  }

  registerMessage(registerResponse) {
    let responseIcon;
    let responseMessage;
    if (registerResponse?.code == 'auth/email-already-in-use') {
      responseIcon = 'error';
      responseMessage = 'El correo electrónica ya se encuentra registrado';
    } else {
      responseIcon = 'success',
      responseMessage = '¡Registro con éxito! Por favor inicia sesión';
    }

    swal.fire({
      icon: responseIcon,
      text: responseMessage
    }).then(actionResp => {
      if(actionResp.isConfirmed) {
        this._router.navigate(['']);
      }
    });
  }

  verifySession(isAuth) {
    if (!isAuth) {
      swal.fire({
        icon: 'warning',
        text: 'Lo sentimos, no tienes permisos para estar aquí, debes iniciar sesión'
      }).then(data => {
        if(data.isConfirmed) {
          this._router.navigate(['']);
        }
      })
    }
  }
}
