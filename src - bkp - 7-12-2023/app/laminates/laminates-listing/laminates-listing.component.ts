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
  public usersPager: any = [];

  pager: any = {};
  pagedItems: any[];

  public PageIndex: number = 1;
  public PageSize: number = 20;
  public flag: number = 1;
  public totalCount: number = 0;
  public isLoading: boolean = false;

  public item_data = {
    PageIndex: this.PageIndex,
    PageSize: this.PageSize,
  };

  ngOnInit() {
    this.getLaminates();
  }

  // getLaminates(){
  //   this.isLoading = true;
  //   this.item_data.PageIndex = this.PageIndex;
  //   this.item_data.PageSize = this.PageSize;
  //   this.service.getLaminates(this.item_data).subscribe(res => {
  //     var responseData = JSON.parse(JSON.stringify(res));
  //     if (responseData.success) {
  //       this.laminate_list = responseData.laminates;
  //       this.objtotalrecords = responseData.total_records;

  //       if (this.laminate_list.length > 0 && this.flag == 1) { // initialize to page 1
  //         this.flag = 0;
  //         this.setPage(this.PageIndex, this.flag);
  //       }
  //       else if (this.laminate_list.length == 0) {
  //         this.laminate_list = [];
  //       }
  //     }
  //     else {
  //       this.laminate_list = [];
  //     }
  //     this.isLoading = false;
  //   }, error => { console.log(error) })

  // }

  getLaminates() {
    this.isLoading = true;

    this.service.getLaminates(this.item_data).subscribe((response: { success: number, message: string, laminates: [], total_records: number }) => {
      if (response.success == 1) {
        this.laminate_list = response.laminates;
        this.totalCount = response.total_records;
        this.setUsersPage(this.item_data.PageIndex, 0);
      } else {
      }
      this.isLoading = false;
    })
  }

  // setPage(page: number, flag: number) {

  //   this.pager = this.pagerService.getPager(this.objtotalrecords, page, this.PageSize);
  //   this.PageIndex = this.pager.currentPage;
  //   if (flag == 1) {
  //     this.getLaminates();
  //   }
  // }


  setUsersPage(page: number, flag: number) {
    this.usersPager = this.pagerService.getPager(this.totalCount, page, this.item_data.PageSize);
    this.item_data.PageIndex = this.usersPager.currentPage;
    console.log(this.usersPager);
    if (flag == 1) {
      this.getLaminates();
    }
  }

}
