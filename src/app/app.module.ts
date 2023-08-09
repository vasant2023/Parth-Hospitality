import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LaminatesListingComponent } from './laminates/laminates-listing/laminates-listing.component';
import { LaminatesCategoryComponent } from './laminates/laminates-category/laminates-category.component';
import { HardwaresListingComponent } from './hardware/hardwares-listing/hardwares-listing.component';
import { HardwaresCategoryComponent } from './hardware/hardwares-category/hardwares-category.component';
import { ItemsListingComponent } from './items/items-listing/items-listing.component';
import { ItemsCategoryComponent } from './items/items-category/items-category.component';
import { CollectionsListingComponent } from './collections/collections-listing/collections-listing.component';
import { CollectionsCategoryComponent } from './collections/collections-category/collections-category.component';
import { BrandsComponent } from './brands/brands.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectionDetailComponent } from './collections/collection-detail/collection-detail.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LaminatesListingComponent,
    LaminatesCategoryComponent,
    HardwaresListingComponent,
    HardwaresCategoryComponent,
    ItemsListingComponent,
    ItemsCategoryComponent,
    CollectionsListingComponent,
    CollectionsCategoryComponent,
    BrandsComponent,
    ContactUsComponent,
    CollectionDetailComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
