import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";


@Component({
  selector: 'app-items-listing',
  templateUrl: './items-listing.component.html',
  styleUrls: ['./items-listing.component.css']
})
export class ItemsListingComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  item_list: any = [];

  ngOnInit() {
    this.getItems();
  }

  getItems(){
    this.service.getItems().subscribe((response : {success: number, message: string, items:[]}) => {
      if(response.success == 1){
        this.item_list = response.items;
        console.log(this.item_list);
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
