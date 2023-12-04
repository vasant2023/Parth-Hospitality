import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";

@Component({
  selector: 'app-collections-listing',
  templateUrl: './collections-listing.component.html',
  styleUrls: ['./collections-listing.component.css']
})
export class CollectionsListingComponent implements OnInit {

  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
  ) {
    
  }
  

  public isLoading:boolean = false;
  collection_list: any = [];


  ngOnInit() {
    this.getHotelSlug();
    this.getCollection();
    this.route.paramMap.subscribe(params => {this.getHotelSlug()})
  }

  public hotel_slug = "";
  getHotelSlug(){
    this.hotel_slug = this.route.snapshot.params['hotel_slug'];
    if(this.hotel_slug){
      this.getHotelWiseCollection();
    }
  }

  public hotel_wise_collection:any = [];
  getHotelWiseCollection(){
    if(this.hotel_slug && this.hotel_slug != ""){
      this.isLoading = true;
      this.service.getHotelWiseCollection(this.hotel_slug).subscribe((response:any) => {
        if(response.success == 1){
          this.hotel_wise_collection = response.categories;
        }
        this.isLoading = false
      })
    }
  }

  getCollection(){
    this.isLoading = true;
    this.service.getCollection().subscribe((response : {success: number, message: string, collections:[]}) => {
      if(response.success == 1){
        this.collection_list = response.collections;
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
      this.isLoading = false;
    })
  }

}
