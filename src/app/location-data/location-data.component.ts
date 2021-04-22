import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form.service';
import {Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
/// <reference types="@types/googlemaps" /> import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-location-data',
  templateUrl: './location-data.component.html',
  styleUrls: ['./location-data.component.scss']
})
export class LocationDataComponent implements OnInit {
  @Input() mainForm;
  locationForm: FormGroup;
  patterns;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  //


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

  public handleAddressChange(address: any) {
    console.log(address)
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.locationForm.get('address').setValue(result.name);
    this.locationForm.get('address').updateValueAndValidity();
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(locationSelec: Location) {
    console.log('onLocationSelected: ', locationSelec);
    this.locationForm.get('latitude').setValue(locationSelec.latitude);
    this.locationForm.get('longitude').setValue(locationSelec.longitude);
    const geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(locationSelec.latitude, locationSelec.longitude);
    geocoder.geocode({location: latlng}, (result, status) => {
      const cityName = this.getCity(result[0].address_components)
      const country = this.getCountry(result[0].address_components);
      this.locationForm.get('city_long_name').setValue(cityName.long_name);
      this.locationForm.get('country_long_name').setValue(country.long_name);
      this.locationForm.get('city_long_name').updateValueAndValidity();
      this.locationForm.get('country_long_name').updateValueAndValidity();
    })
    this.latitude = locationSelec.latitude;
    this.longitude = locationSelec.longitude;
  }

 onGermanAddressMapped($event) {
    console.log('onGermanAddressMapped', $event);
  }

  getCity(googleResponse) {
    return googleResponse.find(city => {
      if(city.types[0] == 'locality') {
        return city.long_name;
      }
    });
  }

  getCountry(googleResponse) {
    return googleResponse.find(city => {
      if(city.types[0] == 'country') {
        return city.long_name;
      }
    });
  }
}
