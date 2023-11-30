import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";

@Component({
  selector: 'app-collections-listing',
  templateUrl: './collections-listing.component.html',
  styleUrls: ['./collections-listing.component.css']
})
export class CollectionsListingComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  public isLoading:boolean = false;
  collection_list: any = [];


  ngOnInit() {
    this.getCollection();
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
