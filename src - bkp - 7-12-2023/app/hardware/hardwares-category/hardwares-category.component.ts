import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";

@Component({
  selector: 'app-hardwares-category',
  templateUrl: './hardwares-category.component.html',
  styleUrls: ['./hardwares-category.component.css']
})
export class HardwaresCategoryComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  hardware_list: any = [];

  ngOnInit() {
    this.getHardwarecategories();
  }

  getHardwarecategories(){
    this.service.getHardwarecategories().subscribe((response : {success: number, message: string, categories:[]}) => {
      if(response.success == 1){
        this.hardware_list = response.categories;
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
