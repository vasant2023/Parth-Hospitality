

// import { Component, OnInit, ViewChild } from '@angular/core';
import { Component, ElementRef, Renderer2, OnInit, ViewChild,HostListener } from '@angular/core';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

import { Title } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { ServiceService } from 'src/app/_services/service.service';
import Swal from "sweetalert2";
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';
import { style } from '@angular/animations';
declare var $: any


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentRoute: string;

  isNavHidden: boolean = false;
  lastScrollPosition: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    this.isNavHidden = scrollY > this.lastScrollPosition && scrollY > 100;
    this.lastScrollPosition = scrollY;
  }




  contactObj: any = {
    name: "",
    email: "",
    phone: "",
    message: "",
    company_name: "",
    city: "",
    state: "",
    zip_code: "",
    country: "231",
    phonecode:'1',
    property_code: "",
    rooms: "",
    brochure: 0,
    item_IDs: [],
    laminate_IDs: [],
    flooring_IDs: [],
    addons_IDs: []
  }

  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    public service: ServiceService,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit() {
    this.menuCollection();
    this.itemCollection();


    this.getCountries();
    this.loadStates(this.contactObj.country);


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

  itemList: any = [];
  itemCollection() {
    this.service.item_categories().subscribe((response: any) => {
      if (response.success == 1) {
        this.itemList = response.categories;
      }
    })
  }

  public searchPhoneCode:any = "";
  public filteredCountries:any = []

  filterCountries(value: string){
    this.searchPhoneCode = value;
    console.log(this.searchPhoneCode);

    if(this.searchPhoneCode !== ''){
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(this.searchPhoneCode.toLowerCase()) ||
        country.phonecode.includes(this.searchPhoneCode)
      );
    } else {
      this.filteredCountries = this.countries
    }
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


  all_close_menu() {
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


  item_all_close_menu() {
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

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  countries: any = [];
  states: any = [];
  cities: any = [];

  // laminateArray:any=[];
  // flatArrayLaminates:any=[];

  getCountries() {
    this.service.getCountries().subscribe((response: { success: number, message: string, data: [] }) => {
      if (response.success == 1) {
        this.countries = response.data;
        this.filteredCountries = this.countries;
      }
    })
  }

  loadStates(id) {
    if (id) {
      this.service.getStates(id).subscribe((response: { success: number, message: string, data: [] }) => {
        if (response.success == 1) {
          this.states = response.data;
        } else {
          console.log(response.message)
        }
      })
    }
  }

  loadCities(state) {
    if (state) {
      this.service.getCities(state).subscribe((response: { success: number, message: string, data: [] }) => {
        if (response.success == 1) {
          this.cities = response.data;
        } else {
          console.log(response.message)
        }
      })
    }
  }



  public enquiry = false;

  handleBrochure() {
    if (this.enquiry) {
      this.enquiry = false;
    } else {
      this.enquiry = true;
    }
  }


  closeEnquiry(){
    this.enquiry = false;
  }

  public country_code_clickF = false;
  country_code_click() {
      this.country_code_clickF =  !this.country_code_clickF;
  }

  country_code_click_false() {
    this.country_code_clickF = false;
  }

  country_click_career(id, phonecode) {
    // this.contactObj.country = id;
    this.contactObj.phonecode = phonecode;
    this.loadStates(this.contactObj.country);
    this.country_code_clickF = false;
  }

  closeCountry(){
    this.country_code_clickF = false
  }


  submitContactForm() {
    if (this.isLoading == false) {
      this.isLoading = true;
      // this.contactObj.phone = this.contactObj.country + " " + this.contactObj.phone;
      this.service.submitContactForm(this.contactObj).subscribe((response: { success: number, message: string }) => {
        if (response.success == 1) {

          this.enquiry = false
          Swal.fire("Thank You for Contacting!", "Our team members will be in touch with you shortly!");
          this.router.navigate(["/collections"]);
        }
        this.isLoading = false;
        this.contactObj.phone = "91"
      })
    }
    // }
  }
}
