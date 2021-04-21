import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from './customer/customer.component';
import { LayoutComponent } from './layout/layout.component';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {AgmCoreModule} from '@agm/core';
import { LocationDataComponent } from './location-data/location-data.component';





@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CustomerComponent,
    LayoutComponent,
    LocationDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyArUPOhtOJyjOOEpiPHG-atVtR_0cyqEOY',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
