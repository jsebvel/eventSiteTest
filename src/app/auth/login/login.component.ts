import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/formService/form.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { MessagesService } from 'src/app/services/messageService/message.service';
import { Store } from '@ngrx/store';
// import { login } from '../session/session.actions';
// import { SessionState } from '../session.reducers';
// import { isLoadiing, stopLoading } from 'src/app/shadred/ui.actions';
import { Subscription } from 'rxjs';
import { IdState } from 'src/app/user/userRedux/user.reducer';
import { updateUserId } from 'src/app/user/userRedux/user.actions';
// import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  emailPattern = '[ÑA-Zña-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})';
  isLoading = false;
  loginSubscription: Subscription;
  userId;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router,
    private _userService: UserService,
    private _messaService: MessagesService,
    private _userRDX: Store<IdState>

  ) { }

  ngOnInit(): void {
    this.verifyLogin();
    this.initializeLoginForm();
    this._userRDX.select('id').subscribe(id => {
      this.userId;
    })

  }

  initializeLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])]
    });
  }

  ngOnDestroy() {

  }

  getError(fieldName: string) {
    return this.formService.getError(fieldName, this.loginForm)
  }

  login() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.getRawValue();
      // this.authStore.dispatch(isLoadiing())

      this._userService.login(userData)
        .then(loginResponse => {
          // this.authStore.dispatch(stopLoading())
          this._userRDX.dispatch(updateUserId({ id: loginResponse.user.uid }))
          this._messaService.loginMessages(loginResponse);
          this.router.navigate(['create']);
          // this.store.dispatch(login({ email: userData.email }))


        })
        .catch(loginResponse => {
          // this.authStore.dispatch(stopLoading())
          this._messaService.loginMessages(loginResponse);
        });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  verifyLogin() {
    this.loginSubscription?.unsubscribe()
  }


}
