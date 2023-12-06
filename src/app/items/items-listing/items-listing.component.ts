import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
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
    private route: ActivatedRoute,
    private router: Router,


  ) {
    this.route.paramMap.subscribe(params => {
      this.getItemSlug();
    })
   }

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
    // collection_ID: "",
    // category_ID: ""
    slug:""
  };

  ngOnInit() {
    this.getItemSlug();
    // this.getItems();
    // this.getCollection();
    this.menuCollection();
  }

  public itemSlug = "";

  getItemSlug(){
    this.itemSlug = this.route.snapshot.params['slug'];
    if(this.itemSlug){
      this.item_data.slug = this.itemSlug;
      this.getItems();
    }
  }

  onSearchChange(value: string) {
    this.item_data.search = value;
    if (this.item_data.search == '') {
      this.getItems();
    } else {
      this.getItems();
    }
  }

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


//  clearAllFilters() {

//     this.item_data.category_ID = ""
//     this.item_data.collection_ID = ""
//     this.getItems();
// }


  setUsersPage(page: number, flag: number) {
    this.usersPager = this.pagerService.getPager(this.totalCount, page, this.item_data.PageSize);
    this.item_data.PageIndex = this.usersPager.currentPage;
    if (flag == 1) {
      this.getItems();
    }
  }

//   getCollection() {  
//     this.service.getCollection().subscribe((response: { success: number, message: string, collections: [] }) => {
//       if (response.success == 1) {
//         this.collection_list = response.collections;
//       } else {
//       }
//     })
//   }

  menuCollection() {
    this.service.item_categories().subscribe((response:any) => {
      if (response.success == 1) {
        this.categories_list = response.categories;
        this.totalCount = response.total_records;
        this.setUsersPage(this.item_data.PageIndex, 0);
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

 toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
 }
}
