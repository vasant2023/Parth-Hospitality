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
import { LeadComponent } from './lead/lead.component';
import { ChannelPartnerComponent } from './channel-partner/channel-partner.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FAQComponent } from './faq/faq.component';
import { Title } from '@angular/platform-browser';



const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data : {title : "Parth Hospitality | Home"}
  },

  {
    path: 'brands',
    component: BrandsComponent,
    data : {title : "Parth Hospitality | Brands"}
  },
  {
    path: 'items',
    component: ItemsListingComponent,
    data : {title : "Parth Hospitality | Items"}
  },
  {
    path: 'items/:slug',
    component: ItemsListingComponent,
    data : {title : "Parth Hospitality | Items"}
  },
  {
    path: 'items-category',
    component: ItemsCategoryComponent,
    data : {title : "Parth Hospitality | Items"}
  },
  {
    path: 'collections',
    component: CollectionsListingComponent,
    data : {title : "Parth Hospitality | Collection"}
  },
  {
    path: 'collections/hotel/:hotel_slug',
    component: CollectionsListingComponent,
    data : {title : "Parth Hospitality | Collection"}
  },
  {
    path: 'collections/:slug',
    component: CollectionDetailComponent,
    data : {title : "Parth Hospitality | Collection Detail"}
  },
  {
    path: 'collections-category',
    component: CollectionsCategoryComponent,
    data : {title : "Parth Hospitality | Collection"}
  },
  {
    path: 'hardwares',
    component: HardwaresListingComponent,
    data : {title : "Parth Hospitality | Hardwares"}
  },
  {
    path: 'hardwares-category',
    component: HardwaresCategoryComponent,
    data : {title : "Parth Hospitality | Hardwares"}
  },
  {
    path: 'laminates',
    component: LaminatesListingComponent,
    data : {title : "Parth Hospitality | Laminates"}
  },
  {
    path: 'laminates-category',
    component: LaminatesCategoryComponent,
    data : {title : "Parth Hospitality | Laminates"}
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data : {title : "Parth Hospitality | Contact Us"}
  },
  {
    path: 'channel-partner',
    component: ChannelPartnerComponent,
    data : {title : "Parth Hospitality | Channel Partner"}
  },
  {
    path: 'lead/:slug',
    component: LeadComponent,
    data : {title : "Parth Hospitality | Inquiry"}
  },
  {
    path: 'about',
    component: AboutComponent,
    data : {title : "Parth Hospitality | About"}
  },
  {
    path: 'blog',
    component: BlogComponent,
    data : {title : "Parth Hospitality | Blog"}
  },
  {
    path: 'blog/:blog_slug',
    component: BlogDetailComponent,
    data : {title : "Parth Hospitality | Blog"}
  },
  {
    path: 'faq',
    component: FAQComponent,
    data : {title : "Parth Hospitality | FAQs"}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
