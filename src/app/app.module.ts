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
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { LocationDataComponent } from './location-data/location-data.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { updateId } from './user/userRedux/user.reducer';
import { EditionComponentComponent } from './edition-component/edition-component.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { setIsloading } from './auth/authStore/authStore.reducer';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CustomerComponent,
    LayoutComponent,
    LocationDataComponent,
    EditionComponentComponent,
    RegisterComponent,
    LoginComponent
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
      apiKey: 'AIzaSyBYgB5U85_FQvovNgeDJhGVxUpVuP4AmgI',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    SweetAlert2Module,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({ id: updateId, loading: setIsloading }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
