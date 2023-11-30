import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";
import { PagerService } from 'src/app/_services/pager.service';

@Component({
  selector: 'app-laminates-listing',
  templateUrl: './laminates-listing.component.html',
  styleUrls: ['./laminates-listing.component.css']
})
export class LaminatesListingComponent implements OnInit {

  constructor(
    public service: ServiceService,
    private pagerService: PagerService,
  ) { }

  laminate_list: any = [];


  pager: any = {};
  pagedItems: any[];
  PageIndex: number = 1;
  PageSize: number = 20;
  flag: number = 1;
  objtotalrecords: number;

  public item_data = {
    PageIndex: this.PageIndex,
    PageSize: this.PageSize,
  };

  ngOnInit() {
    this.getLaminates();
  }

  getLaminates(){
    this.item_data.PageIndex = this.PageIndex;
    this.item_data.PageSize = this.PageSize;
    this.service.getLaminates(this.item_data).subscribe(res => {
      var responseData = JSON.parse(JSON.stringify(res));
      if (responseData.success) {
        this.laminate_list = responseData.laminates;
        this.objtotalrecords = responseData.total_records;

        if (this.laminate_list.length > 0 && this.flag == 1) { // initialize to page 1
          this.flag = 0;
          this.setPage(this.PageIndex, this.flag);
        }
        else if (this.laminate_list.length == 0) {
          this.laminate_list = [];
        }
      }
      else {
        this.laminate_list = [];
      }
    }, error => { console.log(error) })
  }

  setPage(page: number, flag: number) {

    this.pager = this.pagerService.getPager(this.objtotalrecords, page, this.PageSize);
    this.PageIndex = this.pager.currentPage;
    if (flag == 1) {
      this.getLaminates();
    }
  }



}
