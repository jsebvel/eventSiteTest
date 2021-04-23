import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from '../messageService/message.service';
import { UserService } from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _messaService: MessagesService

  ) { }
  canActivate(): Observable<boolean> {
    return this._userService.isAuth().pipe(
      tap(state => {
        if (!state) {
          this._messaService.verifySession(state);
        }
      })
    );
  }

}
