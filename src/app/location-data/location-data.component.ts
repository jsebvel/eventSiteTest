import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-location-data',
  templateUrl: './location-data.component.html',
  styleUrls: ['./location-data.component.scss']
})
export class LocationDataComponent implements OnInit {
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

  initForm() {

  }

}
