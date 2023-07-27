import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";

@Component({
  selector: 'app-laminates-listing',
  templateUrl: './laminates-listing.component.html',
  styleUrls: ['./laminates-listing.component.css']
})
export class LaminatesListingComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  laminate_list: any = [];

  ngOnInit() {
    this.getLaminates();
  }

  getLaminates(){
    this.service.getLaminates().subscribe((response : {success: number, message: string, laminates:[]}) => {
      if(response.success == 1){
        this.laminate_list = response.laminates;
      } else {
        // this.toastr.error(response.message, "Error", {});
        // this.loaderService.hide();
      }
    })
  }

}
