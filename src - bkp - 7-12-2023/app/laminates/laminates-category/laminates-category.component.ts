import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";


@Component({
  selector: 'app-laminates-category',
  templateUrl: './laminates-category.component.html',
  styleUrls: ['./laminates-category.component.css']
})
export class LaminatesCategoryComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  laminates_list: any = [];

  ngOnInit() {
    this.getLaminatecategories()
  }

  getLaminatecategories(){
    this.service.getLaminatecategories().subscribe((response : {success: number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.laminates_list = response.categories;
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
