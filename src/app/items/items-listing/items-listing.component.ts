import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../../_services/service.service";
import { PagerService } from 'src/app/_services/pager.service';


@Component({
  selector: 'app-items-listing',
  templateUrl: './items-listing.component.html',
  styleUrls: ['./items-listing.component.css']
})
export class ItemsListingComponent implements OnInit {

  constructor(
    public service: ServiceService,
    private pagerService: PagerService,
  ) { }

  item_list: any = [];

  pager: any = {};
  pagedItems: any[];
  PageIndex: number = 1;
  PageSize: number = 20;
  flag: number = 1;

  objtotalrecords: number;

  public item_data = {
    PageIndex: this.PageIndex,
    PageSize: this.PageSize,
    search: "",
  };

  ngOnInit() {
    this.getItems();
  }

  onSearchChange(value: string) {
    this.item_data.search = value;
    if(this.item_data.search == ''){
      this.getItems();
    } else {
      this.getItems();
    }
  }

  getItems() {
    // this.item_data.search = this.search;
    // this.item_data.search = this.item_data.search ? this.item_data.search : "";
    this.item_data.PageIndex = this.PageIndex;
    this.item_data.PageSize = this.PageSize;

    this.service.getItems(this.item_data).subscribe((response: { success: number, message: string, items: [] }) => {
      if (response.success == 1) {
        this.item_list = response.items;
        this.objtotalrecords = 200;

        if (this.item_list.length > 0 && this.flag == 1) { // initialize to page 1
            this.flag = 0;
            this.setPage(this.PageIndex, this.flag);
        }
        else if (this.item_list.length == 0) {
            this.item_list = [];
        }
      } else {
        this.item_list = [];
      }
    })
  }

  setPage(page: number, flag: number) {

    this.pager = this.pagerService.getPager(200, page, this.PageSize);
    this.PageIndex = this.pager.currentPage;
    if (flag == 1) {
      this.getItems();
    }
  }


}
