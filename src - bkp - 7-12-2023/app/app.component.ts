import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ServiceService } from './_services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    public service: ServiceService,
    private route: ActivatedRoute,

  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.menuCollection();
    this.itemCollection();
  }

  menuList: any = [];
  title = 'Parth-Hospitality';

  menuCollection() {
    this.service.menuCollection().subscribe((response: { success: number, message: string, categories: [] }) => {
      if (response.success == 1) {
        this.menuList = response.categories;
        console.log(this.menuList);
      }
    })
  }

  itemList:any = [];
  itemCollection(){
    this.service.item_categories().subscribe((response:any) => {
      if(response.success == 1){
        this.itemList = response.categories;
      }
    })
  }



  public mobile_menu_click_F = false;
  mobile_menu_click() {
    if (this.mobile_menu_click_F) {
      this.mobile_menu_click_F = false;
    } else {
      this.mobile_menu_click_F = true;
    }
  }

  mobile_menu_close_click() {
    this.sub_menu_click_f = false;
    this.sub_menu_2_click_false = false;
    this.sub_menu_2_click_f = "";
  }



  public sub_menu_click_f = false;
  sub_mobile_menu_click() {
    if (this.sub_menu_click_f) {
      this.sub_menu_click_f = false;
    } else {
      this.sub_menu_click_f = true;
    }
  }

  sub_mobile_menu_click_close() {
    this.sub_menu_click_f = false;
  }

  public sub_menu_2_click_false = false;
  public sub_menu_2_click_f = "";
  sub_mobile_2_menu_click(category_ID) {
    // if (this.sub_menu_2_click_f) {
      this.sub_menu_2_click_f = category_ID;
    // } 
  }

  sub_mobile_2_menu_click_close() {
    this.sub_menu_2_click_false = false;
    this.sub_menu_2_click_f = "";
  }


  all_close_menu(){
    this.sub_menu_2_click_false = false;
    this.sub_menu_click_f = false;
    this.mobile_menu_click_F = false;
    this.sub_menu_2_click_f = "";
  }


  public item_sub_menu_click_f = false;
  item_sub_mobile_menu_click() {
    if (this.item_sub_menu_click_f) {
      this.item_sub_menu_click_f = false;
    } else {
      this.item_sub_menu_click_f = true;
    }
  }

  item_sub_mobile_menu_click_close() {
    this.item_sub_menu_click_f = false;
  }

  public item_sub_menu_2_click_false = false;
  public item_sub_menu_2_click_f = "";
  item_sub_mobile_2_menu_click(slug) {
    // if (this.sub_menu_2_click_f) {
      this.item_sub_menu_2_click_f = slug;
    // } 
  }

  item_sub_mobile_2_menu_click_close() {
    this.item_sub_menu_2_click_false = false;
    this.item_sub_menu_2_click_f = "";
  }


  item_all_close_menu(){
    this.item_sub_menu_2_click_false = false;
    this.item_sub_menu_click_f = false;
    this.mobile_menu_click_F = false;
    this.item_sub_menu_2_click_f = "";
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
 }

}
