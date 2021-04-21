import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() mainForm;
  userForm: FormGroup;
  patterns;
  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
  ) { }

  ngOnInit(): void {
    this.getAllPatters();
    this.initForm();
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
    this.userForm.addControl('password', new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])))
    this.userForm.addControl('verify_password', new FormControl('', Validators.compose([Validators.required])))
  }

  getAllPatters() {
    this.patterns = this._formService.getAllPatterns();
  }

  getErrors(fieldName: string) {
    return this._formService.getError(fieldName, this.userForm);
  }

}
