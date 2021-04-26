import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormService } from '../services/formService/form.service';
import { UserService } from '../services/userService/user.service';
import { IdState } from './userRedux/user.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() mainForm;
  userForm: FormGroup;
  patterns;
  userId;
  userData;
  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
    private _userRDX: Store<IdState>,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getAllPatters();
    this.initForm();
    this._userRDX.select('id').subscribe(id => {
      this.userId = id;
    });
    this._userService.getUserData().valueChanges().subscribe(data => {
      this.userData = data;
      this.setValues();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mainForm.status != 'DISABLED' && !this.mainForm.contains('userForm')) {
      if (!this.patterns) {
        this.getAllPatters();
      }
      this.initForm();
    }
  }

  initForm() {
    this.mainForm.addControl('userForm', this._formBuilder.group([]));
    this.userForm = this.mainForm.get('userForm') as FormGroup;
    this.userForm.addControl('first_name', new FormControl('', Validators.compose(this._formService.defaultNameValidator)));
    this.userForm.addControl('last_name', new FormControl('', Validators.compose(this._formService.defaultNameValidator)))
    this.userForm.addControl('email', new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.patterns.emailPattern)])))
    this.userForm.addControl('code', new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.pattern(this.patterns.numericPattern)])))
    this.userForm.addControl('phone', new FormControl('', Validators.compose([Validators.required, Validators.min(6)])))
  }

  /**
   * @description get the patterns to use them in validators.pattern
   */
  getAllPatters() {
    this.patterns = this._formService.getAllPatterns();
  }

  /**
   * @description Get the message error according to the
   * field invalid reason
   * @param field It's the field name
   * @returns error message referents to current invalid reason.
   */
  getErrors(fieldName: string) {
    return this._formService.getError(fieldName, this.userForm);
  }

  /**
   * @description Get the current user data and set information to form to show it
   */
  setValues() {
    if (this.userData) {
      this.userForm.get('first_name').setValue(this.userData.name);
      this.userForm.get('last_name').setValue(this.userData.last_name);
      this.userForm.get('email').setValue(this.userData.email);
      this.userForm.get('code').setValue(this.userData.code);
      this.userForm.get('phone').setValue(this.userData.phone);
    }
  }

}
