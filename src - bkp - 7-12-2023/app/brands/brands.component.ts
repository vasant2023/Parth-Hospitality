import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../_services/service.service";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  brand_list: any = [];

  ngOnInit() {
    this.getBrands();
  }

  getBrands(){
    this.service.getBrands().subscribe((response : {success: number, message: string, brands:[]}) => {
      if(response.success == 1){
        this.brand_list = response.brands;
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
