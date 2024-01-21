import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {RegisterComponent} from './components/register/register.component';
import {ProductComponent} from './components/product/product.component'
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AllfilterComponent } from './components/allfilter/allfilter.component';
import { InfoComponent } from './components/info/info.component';
import { PropertyImagesComponent } from './components/property-images/property-images.component';
import { MapComponent } from './components/map/map.component';
import { MapviewComponent } from './components/mapview/mapview.component';
import { TopNewsComponent } from './components/top-news/top-news.component';
import { NewArrivalsComponent } from './components/new-arrivals/new-arrivals.component';
import { ShareComponent } from './components/share/share.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminpannelComponent } from './components/adminpannel/adminpannel.component';
import { UsersComponent } from './components/users/users.component';
import { ComplantsComponent } from './components/complants/complants.component';
import { AdminprofileComponent } from './components/adminprofile/adminprofile.component';
import { Path } from 'leaflet';
import { AdminProductComponent } from './Admin Product/product.component';
import { AdminpropertyComponent } from './components/adminproperty/adminproperty.component';
import { AdminmsgsComponent } from './components/adminmsgs/adminmsgs.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'register_form', component: RegisterComponent},
  {path: 'property/:id', component:ProductComponent},
  {path: 'new/property/:id', component:ProductComponent},
  {path: "wishlist", component:WishlistComponent},
  {path: 'alfil', component:AllfilterComponent},
  {path: 'alfil/""', component: HomeComponent},

  {path: 'alfil/property/:id', component:ProductComponent},
  {path: 'wishlist/property/:id', component:ProductComponent},

  {path: 'info', component:InfoComponent},
  {path: 'alfil/info/property-images/:id',component:PropertyImagesComponent},
  {path: 'alfil/info', component:InfoComponent},
  {path: 'info/property-images/:id',component:PropertyImagesComponent},
  {path: 'map',component:MapviewComponent},
  {path: 'new',component:NewArrivalsComponent},
  {path: 'share',component:ShareComponent},
  {path: 'subscribe',component:SubscribeComponent},
  {path: 'Admin',component:AdminComponent},
  {path: 'adminpannel',component:AdminpannelComponent},
  {path: 'users',component:UsersComponent},
  {path: 'complants',component:ComplantsComponent},
  {path: 'complants/adminpannel/adminprofile',component:AdminprofileComponent},
  {path: 'complants/adminpannel',component:AdminpannelComponent},
  {path: 'users/adminpannel',component:AdminpannelComponent},
  {path: 'complants/adminproperty/:id/:reportid',component:AdminpropertyComponent},
  {path: 'adminmsgs',component:AdminmsgsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
