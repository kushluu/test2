import { NgModule } from '@angular/core';
import {  BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
// import { NgxStarsModule } from 'ngx-stars';
import { ProductComponent } from './components/product/product.component';
import { MapComponent } from './components/map/map.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AllfilterComponent } from './components/allfilter/allfilter.component';
import { Ng5SliderModule } from 'ng5-slider';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StarRatingModule} from 'angular-star-rating'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InfoComponent } from './components/info/info.component';
import { PropertyImagesComponent } from './components/property-images/property-images.component';
import { MapviewComponent } from './components/mapview/mapview.component';
import { TopNewsComponent } from './components/top-news/top-news.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
// import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
// import { ShareIconsModule } from 'ngx-sharebuttons/icons';
// import { ShareModule } from 'ngx-sharebuttons';
import { ShortPipe } from './pipes/short.pipe';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AdminComponent } from './components/admin/admin.component';
import { AdminpannelComponent } from './components/adminpannel/adminpannel.component';
import { UsersComponent } from './components/users/users.component';
import { ComplantsComponent } from './components/complants/complants.component';
import { AdminprofileComponent } from './components/adminprofile/adminprofile.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'  ;
import { MatIconModule } from '@angular/material/icon';
import {Chart} from 'chart.js';
import { AdminpropertyComponent } from './components/adminproperty/adminproperty.component';
import { AdminmsgsComponent } from './components/adminmsgs/adminmsgs.component';
import { MatDialogModule} from '@angular/material/dialog'
// import { Ng5SliderModule } from 'ng5-slider';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    RegisterComponent,
    ProductComponent,
    MapComponent,
    WishlistComponent,
    AllfilterComponent,
    InfoComponent,
    PropertyImagesComponent,
    MapviewComponent,
    TopNewsComponent,
    NewArrivalsComponent,
    ShortPipe,
    SubscribeComponent,
    AdminComponent,
    AdminpannelComponent,
    UsersComponent,
    ComplantsComponent,
    AdminprofileComponent,
    AdminpropertyComponent,
    AdminmsgsComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    // NgxStarsModule,
    Ng5SliderModule,
    MatTabsModule,
    BrowserAnimationsModule,
    StarRatingModule,
    NgbModule,
    // ShareButtonsModule.withConfig({
    //   debug: true
    // }),
    // ShareIconsModule,
    // ShareModule,

    // material
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
