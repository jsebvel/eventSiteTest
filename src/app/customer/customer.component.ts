import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/formService/form.service';
import { UserService } from '../services/userService/user.service';
import PlaceResult = google.maps.places.PlaceResult;
import { GooglePlaceDirective } from "node_modules/ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements OnInit {
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  @Input() mainForm;
  @Input() item;
  customerForm: FormGroup;
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  geocoder = new google.maps.Geocoder();
  patterns;
  options = {
    componentRestrictions: { country: "co" },
  };


  constructor(
    private _formBuilder: FormBuilder,
    private _formService: FormService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    if (!this.item) {
      this.initForm();
    } else {
      this.createForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.item) {
      if (this.mainForm.status != 'DISABLED' && !this.mainForm.contains('customerForm')) {
        if (!this.patterns) {
          this.getAllPatters();
        }
        this.initForm();
      }

    }
  }

  initForm() {
    this.mainForm.addControl('customerForm', this._formBuilder.group([]));
    this.customerForm = this.mainForm.get('customerForm') as FormGroup;
    this.customerForm.addControl('name', new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])));
    this.customerForm.addControl('service_delivery', new FormControl('', Validators.compose([])));
    this.customerForm.addControl('service_take_away', new FormControl('', Validators.compose([])));
    this.customerForm.addControl('service_book', new FormControl('', Validators.compose([])));
    this.customerForm.addControl('service_table', new FormControl('', Validators.compose([])));
    this.customerForm.addControl('service_room', new FormControl('', Validators.compose([])));
    this.customerForm.addControl('number_of_branches', new FormControl('', Validators.compose([Validators.required])));
    this.customerForm.addControl('latitude', new FormControl('', Validators.compose([Validators.required])))
    this.customerForm.addControl('longitude', new FormControl('', Validators.compose([Validators.required])))
    this.customerForm.addControl('address', new FormControl('', Validators.compose([Validators.required])))
    this.customerForm.addControl('city_long_name', new FormControl('', Validators.compose([Validators.required])))
    this.customerForm.addControl('country_long_name', new FormControl('', Validators.compose([Validators.required])))
  }

  /**
   * @description This function is calle from Edition component, and it set the customer information on field
   * to edit it or delete customer
   */
  createForm() {
    this.customerForm = this._formBuilder.group({
      'name': [this.item.name, Validators.compose([Validators.required, Validators.minLength(6)])],
      'service_delivery': [this.item.service_delivery, Validators.compose([])],
      'service_take_away': [this.item.service_take_away, Validators.compose([])],
      'service_book': [this.item.service_book, Validators.compose([])],
      'service_table': [this.item.service_table, Validators.compose([])],
      'service_room': [this.item.service_room, Validators.compose([])],
      'number_of_branches': [this.item.number_of_branches, Validators.compose([Validators.required])],
      'latitude': [this.item.latitude, Validators.compose([Validators.required])],
      'longitude': [this.item.longitude, Validators.compose([Validators.required])],
      'address': [this.item.address, Validators.compose([Validators.required])],
      'city_long_name': [this.item.city_long_name, Validators.compose([Validators.required])],
      'country_long_name': [this.item.country_long_name, Validators.compose([Validators.required])],
    });
    // const locationSelect: Location = ({ latitude: this.item.latitude, longitude: this.item.longitude });
  }

  /**
   * @description Return patterns to use them in Validation fields
   */
  getAllPatters() {
    this.patterns = this._formService.getAllPatterns();
  }

  public handleAddressChange(address: any) {
    console.log(address)
    // const currentAdd = {
    //   latitude : address.geometry.location.lat(),
    //   longitude : address.geometry.location.lng(),
    // }
    this.geocodeAddress(address.geometry.location.lat(), address.geometry.location.lng())
  }

  // onAutocompleteSelected(result) {
  //   this.customerForm.get('address').setValue(result.name);
  //   this.customerForm.get('address').updateValueAndValidity();
  //   console.log('onAutocompleteSelected: ', result);
  //       // const currentAdd = {
  //   //   latitude : address.geometry.location.lat(),
  //   //   longitude : address.geometry.location.lng(),
  //   // }
  //   this.geocodeAddress(result.geometry.location.lat(), result.geometry.location.lng() )
  // }

  // onLocationSelected(locationSelec: Location) {
  //   console.log('onLocationSelected: ', locationSelec);
  //   this.customerForm.get('latitude').setValue(locationSelec.latitude);
  //   this.customerForm.get('longitude').setValue(locationSelec.longitude);
  //   this.geocodeAddress(locationSelec.latitude, locationSelec.longitude);
  // }

  geocodeAddress(latitude, longitude) {
    const geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode({ location: latlng }, (result, status) => {
      const cityName = this.getCity(result[0].address_components)
      const country = this.getCountry(result[0].address_components);
      this.customerForm.get('city_long_name').setValue(cityName.long_name);
      this.customerForm.get('country_long_name').setValue(country.long_name);
      this.customerForm.get('city_long_name').updateValueAndValidity();
      this.customerForm.get('country_long_name').updateValueAndValidity();
      this.customerForm.get('address').setValue(result[0].formatted_address)
      this.customerForm.get('address').updateValueAndValidity();
    })
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * @description Get the geocoder response and extract city name
   * @returns string with city name
   */
  getCity(googleResponse) {
    return googleResponse.find(city => {
      if (city.types[0] == 'locality') {
        return city.long_name;
      }
    });
  }

  /**
 * @description Get the geocoder response and extract country name
 * @returns string with city name
 */
  getCountry(googleResponse) {
    return googleResponse.find(city => {
      if (city.types[0] == 'country') {
        return city.long_name;
      }
    });
  }

  getErrors(fieldName: string) {
    return this._formService.getError(fieldName, this.customerForm);
  }

  /**
   * @description Update customer information from edition
   * @param item It's the customer information send from Edition component
   */
  updateProduct(item) {
    const newFOrm = this.customerForm.getRawValue();
    this._userService.updateCustomerInfo(newFOrm, item.id);
  }
  /**
   * @description Deletes the specified customer
   * @param item It's the customer information send from Edition component
   */
  deleteProduct(item) {
    this._userService.deleteCustomer(item.id);
  }


}
