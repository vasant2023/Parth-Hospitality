import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BrandsComponent } from './brands/brands.component';
import { ItemsListingComponent } from './items/items-listing/items-listing.component';
import { ItemsCategoryComponent } from './items/items-category/items-category.component';
import { CollectionsListingComponent } from './collections/collections-listing/collections-listing.component';
import { CollectionsCategoryComponent } from './collections/collections-category/collections-category.component';
import { HardwaresListingComponent } from './hardware/hardwares-listing/hardwares-listing.component';
import { HardwaresCategoryComponent } from './hardware/hardwares-category/hardwares-category.component';
import { LaminatesListingComponent } from './laminates/laminates-listing/laminates-listing.component';
import { LaminatesCategoryComponent } from './laminates/laminates-category/laminates-category.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CollectionDetailComponent } from './collections/collection-detail/collection-detail.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'brands',
    component: BrandsComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'items',
    component: ItemsListingComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'items-category',
    component: ItemsCategoryComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'collections',
    component: CollectionsListingComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'collections/:slug',
    component: CollectionDetailComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'collections-category',
    component: CollectionsCategoryComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'hardwares',
    component: HardwaresListingComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'hardwares-category',
    component: HardwaresCategoryComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'laminates',
    component: LaminatesListingComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'laminates-category',
    component: LaminatesCategoryComponent,
    data : {title : "Parth Hospitality"}
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data : {title : "Parth Hospitality"}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
