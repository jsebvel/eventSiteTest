import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/services/formService/form.service';
import { MessagesService } from 'src/app/services/messageService/message.service';
import { UserService } from 'src/app/services/userService/user.service';
import { distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  onlyLettersPattern = '^[A-Za-zÀ-ÿ ]+$';
  isLoading = true;
  isLoadingSubscription: Subscription;
  passwordSub: Subscription;
  verifyPassSub: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _formService: FormService,
    private _userService: UserService,
    private _messageService: MessagesService,

  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.createSubsc();

  }

  createSubsc() {
    if (!this.passwordSub) {
      this.passwordSub = this.registerForm.get('password').valueChanges
        .pipe(
          distinctUntilChanged()
        ).subscribe(password => {
          this.verifyPasswordF(password, this.registerForm.get('verifyPassword').value);
        });
    }
    if (!this.verifyPassSub) {
      this.verifyPassSub = this.registerForm.get('verifyPassword').valueChanges
        .pipe(
          distinctUntilChanged()
        ).subscribe(verifPassword => {
          this.verifyPasswordF(this.registerForm.get('password').value, verifPassword)
        })
    }
  }

  initializeForm() {
    this.registerForm = this._formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(this.onlyLettersPattern)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(50)])],
      verifyPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.getRawValue();
      this._userService.registerUser(userData)
        .then(resp => {
          this._messageService.registerMessage(resp);
        })
        .catch(data => {
          // this._authStore.dispatch(stopLoading())
          this._messageService.registerMessage(data);
        });
    } else {
      this.registerForm.markAllAsTouched();
    }

  }

  verifyPasswordF(password, verifyPassword) {
    if (password && verifyPassword) {
      if (password !== verifyPassword) {
        this.registerForm.get('verifyPassword').setErrors({ 'notMatch': true });
        this.getError('verifyPassword')
      } else {
        this.registerForm.get('verifyPassword').setErrors({ 'notMatch': false });
        this.registerForm.get('verifyPassword').updateValueAndValidity();
      }
    }

  }

  getError(field: string) {
    return this._formService.getError(field, this.registerForm);
  }



}
