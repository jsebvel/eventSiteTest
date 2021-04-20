import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
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

  initForm() {
    this.userForm = this._formBuilder.group({
      first_name: ['', this._formService.defaultNameValidator as Validators[]],
      last_name: ['', this._formService.defaultNameValidator as Validators[]],
      email: ['', Validators.required, Validators.pattern(this.patterns.emailPattern)],
      code: ['', Validators.required, Validators.minLength(1), Validators.pattern(this.patterns.numericPattern)],
      phone: ['', Validators.required, Validators.minLength(6), Validators.pattern(this.patterns.numericPattern)],
      password: ['', Validators.required, Validators.minLength(6)],
      verify_password: ['', Validators.required, Validators.minLength(6)]
    });
  }


  getAllPatters() {
    this.patterns = this._formService.getAllPatterns();
  }

  getErrors(fieldName: string) {
    return this._formService.getError(fieldName, this.userForm);
  }

}
