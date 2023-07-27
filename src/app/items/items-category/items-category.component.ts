import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";

@Component({
  selector: 'app-items-category',
  templateUrl: './items-category.component.html',
  styleUrls: ['./items-category.component.css']
})
export class ItemsCategoryComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  item_list: any = [];

  ngOnInit() {
    this.getItemcategories();
  }

  getItemcategories(){
    this.service.getItemcategories().subscribe((response : {success: number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.item_list = response.categories;
        console.log(this.item_list)
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
