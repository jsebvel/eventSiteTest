import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private _router: Router,
  ) { }
  /**
   * @description Handle the response from firebase and show a message
   * according with login response.
   * @param loginResponse Response from Firebase login
   */
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
  /**
   * @description Handle the response from firebase and show a message
     * according with register response.
   * @param registerResponse
   */
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
      if (actionResp.isConfirmed) {
        this._router.navigate(['']);
      }
    });
  }

  /**
   * @description Verify if user has the permission
   * to see specific page.
   * @param isAuth
   */
  verifySession(isAuth) {
    if (!isAuth) {
      swal.fire({
        icon: 'warning',
        text: 'Lo sentimos, no tienes permisos para estar aquí, debes iniciar sesión'
      }).then(data => {
        if (data.isConfirmed) {
          this._router.navigate(['']);
        }
      })
    }
  }

  /**
   * @description Take the message type and create a message with info, according to current
   * action
   * @param {string} messageType Type to create an according message to show
   */
  customerActions(messageType: string) {
    const swalIcon = 'success';
    let swalMessage;
    switch (messageType) {
      case 'success':
        swalMessage = 'El restaurante ha sido creado con éxito';
        break;
      case 'delete':
        swalMessage = 'Restaurante eliminado correctamente';
        break;
      case 'update':
        swalMessage = 'Los datos han sido actualizados correctamente';
    }

    swal.fire({
      icon: swalIcon,
      text: swalMessage
    });
  }

  /**
   * @description show an error message when ca get any info from firebase
   */
  errorMessage() {
    swal.fire({
      icon: 'warning',
      text: 'Por favor verifica los campos en rojo'
    })
  }
}
