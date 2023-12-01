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
  collection_list: any = [];
  categories_list: any = [];
  public usersPager: any = [];

  search = "";
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
    search: "",
    collection_ID: "",
    category_ID: ""
  };

  ngOnInit() {
    this.getItems();
    this.getCollection();
    this.menuCollection();
  }

  onSearchChange(value: string) {
    this.item_data.search = value;
    if (this.item_data.search == '') {
      this.getItems();
    } else {
      this.getItems();
    }
  }


  // getItems() {
  //   this.item_data.search = this.item_data.search ? this.item_data.search : "";
  //   this.item_data.collection_ID = this.item_data.collection_ID ? this.item_data.collection_ID : "";
  //   this.item_data.PageIndex = this.PageIndex;
  //   this.item_data.PageSize = this.PageSize;
  //   this.service.getItems(this.item_data).subscribe((response: any) => {
  //     if (response.success == 1) {
  //       this.item_list = response.items;
  //       if (this.totalCount == 0) {
  //         this.totalCount = response.total_records;
  //       }
  //       if (this.item_list.length > 0 && this.flag == 1) { // initialize to page 1
  //         this.flag = 0;
  //         this.setPage(this.PageIndex, this.flag);
  //       }
  //       else if (this.item_list.length == 0) {
  //         this.item_list = [];
  //       }
  //     }
  //     else {
  //       this.item_list = [];
  //     }
  //   });


  // public isLoading = false;

  getItems() {
    this.isLoading = true;
    this.item_data.search = this.item_data.search ? this.item_data.search : "";

    this.service.getItems(this.item_data).subscribe((response: { success: number, message: string, items: [], total_records: number }) => {
      if (response.success == 1) {
        this.item_list = response.items;
        this.totalCount = response.total_records;
        this.setUsersPage(this.item_data.PageIndex, 0);
      } else {
      }
      this.isLoading = false;
    })
  }


 clearAllFilters() {

    this.item_data.category_ID = ""
    this.item_data.collection_ID = ""
    this.getItems();
}


  // setPage(page: number, flag: number) {

  //   this.pager = this.pagerService.getPager(this.totalCount, page, this.PageSize);
  //   this.PageIndex = this.pager.currentPage;
  //   if (flag == 1) {
  //     this.getItems();
  //   }
  // }

  setUsersPage(page: number, flag: number) {
    this.usersPager = this.pagerService.getPager(this.totalCount, page, this.item_data.PageSize);
    this.item_data.PageIndex = this.usersPager.currentPage;
    console.log(this.usersPager);
    if (flag == 1) {
      this.getItems();
    }
  }



  getCollection() {
    this.service.getCollection().subscribe((response: { success: number, message: string, collections: [] }) => {
      if (response.success == 1) {
        this.collection_list = response.collections;
      } else {
      }
    })
  }



  menuCollection() {
    this.service.item_categories().subscribe((response: { success: number, message: string, categories: [] }) => {
      if (response.success == 1) {
        this.categories_list = response.categories;
      } else {
      }
    })
  }

  public isOpenCollection = false;

  openCollection() {
    if (!this.isOpenCollection) {
      this.isOpenCollection = true;
    }
    else {
      this.isOpenCollection = false;
    }
  }

  closeCollection() {
    this.isOpenCollection = false;
  }




  public is_filter_collection = false;

  isFilterCollection() {
    if (!this.is_filter_collection) {
      this.is_filter_collection = true;
    }
    else {
      this.is_filter_collection = false;
    }
  }


  isFiltercloseCollection() {
    this.is_filter_collection = false;
  }
}
