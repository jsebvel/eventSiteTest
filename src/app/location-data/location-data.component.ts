import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-location-data',
  templateUrl: './location-data.component.html',
  styleUrls: ['./location-data.component.scss']
})
export class LocationDataComponent implements OnInit {
  @Input() mainForm;
  locationForm: FormGroup;
  patterns;

  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
  ) { }

  ngOnInit(): void {
    this.patterns = this._formService.getAllPatterns();
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.mainForm.status != 'DISABLED' && !this.mainForm.contains('locationForm')) {
      if (!this.patterns) {
        this.patterns = this._formService.getAllPatterns();
      }
      this.initForm();
    }
  }

  initForm() {
    this.mainForm.addControl('locationForm', this._formBuilder.group({}));
    this.locationForm = this.mainForm.get('locationForm') as FormGroup;
    this.locationForm.addControl('latitude', new FormControl('', Validators.compose([Validators.required])))
    this.locationForm.addControl('longitude', new FormControl('', Validators.compose([Validators.required])))
    this.locationForm.addControl('address', new FormControl('', Validators.compose([Validators.required])))
    this.locationForm.addControl('city_long_name', new FormControl('', Validators.compose([Validators.required])))
    this.locationForm.addControl('country_long_name', new FormControl('', Validators.compose([Validators.required])))
  }

  getErrors(fieldName: string) {
    this._formService.getError(fieldName, this.locationForm)
  }

  create() {

  }
}
