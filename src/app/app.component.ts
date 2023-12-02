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


}
