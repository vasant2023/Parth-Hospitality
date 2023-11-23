import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";

@Component({
  selector: 'app-hardwares-listing',
  templateUrl: './hardwares-listing.component.html',
  styleUrls: ['./hardwares-listing.component.css']
})
export class HardwaresListingComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  hardware_list: any = [];

  ngOnInit() {
    this.getHardwares();
  }

  getHardwares(){
    this.service.getHardwares().subscribe((response : {success: number, message: string, hardwares:[]}) => {
      if(response.success == 1){
        this.hardware_list = response.hardwares;
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
