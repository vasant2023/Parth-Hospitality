import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";

@Component({
  selector: 'app-collections-category',
  templateUrl: './collections-category.component.html',
  styleUrls: ['./collections-category.component.css']
})
export class CollectionsCategoryComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  collection_list: any = [];

  ngOnInit() {
    this.getCollectioncategories()
  }

  getCollectioncategories(){
    this.service.getCollectioncategories().subscribe((response : {success: number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.collection_list = response.categories;
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
