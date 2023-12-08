// import { Component, OnInit, ViewChild } from '@angular/core';
import { Component, ElementRef, Renderer2, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
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
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  @ViewChild('mainSwiper', { static: false }) mainSwiper: SwiperComponent;
  @ViewChild('secondarySwiper', { static: false }) secondarySwiper: SwiperComponent;

  collectionObj: any = {
    collection_id: "",
    name: "",
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
    country: "",
    property_code: "",
    rooms: "",
    collection_id: this.collectionObj.collection_id,
    brochure: 0,
    item_IDs: [],
    laminate_IDs: [],
    flooring_IDs: [],
    addons_IDs: []
  }

  public productImageSwiper: SwiperConfigInterface = {
    spaceBetween: 10,
    slidesPerView: 3,
    loop: false,
    freeMode: false,
    // loopedSlides: 5,
    observer: true,
    // observeParents: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centeredSlides: false,
  };

  public mainImageSwiper: SwiperConfigInterface = {
    spaceBetween: 20,
    slidesPerView: 1,
    // loop: true,
    observer: true,
    freeMode: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-collection",
      prevEl: ".swiper-button-prev.swiper-button-prev-collection",
    },
  };


  public isLoading: boolean = false;
  public tab = "productSpecification";
  public accName = 'Construction';
  enquiry = false;
  sizeSpecificationItems: any = [];
  flooringList: any = []

  createContactForm: FormGroup;

  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }

  collectionSlug = ""
  collectionDetail: any = {
    items: [],
  }

  ngOnInit() {
    this.getCollectionDetails();
    this.getCountries();
    this.loadStates(91);
    this.getFlooring();
    this.route.paramMap.subscribe(params => {
      this.getCollectionDetails();
    }) 
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // hardwareArray:any=[]
  // flatArrayHardware:any=[];
  countries: any = [];
  states: any = [];
  cities: any = [];

  // laminateArray:any=[];
  // flatArrayLaminates:any=[];

  getCountries() {
    this.service.getCountries().subscribe((response: { success: number, message: string, data: [] }) => {
      if (response.success == 1) {
        this.countries = response.data;
      }
    })
  }

  loadStates(phonecode) {
    if (phonecode) {
      this.service.getStates(phonecode).subscribe((response: { success: number, message: string, data: [] }) => {
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


  public country_code_clickF = false;
  country_code_click() {
      this.country_code_clickF =  !this.country_code_clickF;   
  }

  country_code_click_false() {
    this.country_code_clickF = false;
  }

  country_click_career(id) {
    this.contactObj.country = id;
    this.country_code_clickF = false;
  }

  closeCountry(){
    this.country_code_clickF = false
  }



  getCollectionDetails() {
    this.isLoading = true;
    this.collectionSlug = this.route.snapshot.params['slug'];
    this.contactObj.collection_id = this.collectionSlug
    this.contactObj.country = '91';
    if (this.collectionSlug) {
      this.service.getCollectionDetails(this.collectionSlug).subscribe((response: { success: number, message: string, collection: {} }) => {
        this.collectionObj = response.collection
        console.log(this.collectionObj);
        this.contactObj.collection_id = this.collectionObj.collection_ID;

        if (response.success == 1) {
          this.collectionDetail = response.collection;
          this.sizeSpecificationItems = this.collectionDetail.items;

        }

        this.isLoading = false;
      })
    }
  }



  submitContactForm() {
    if (this.isLoading == false) {
      this.isLoading = true;
      this.contactObj.phone = this.contactObj.country + " " + this.contactObj.phone;
      this.service.submitContactForm(this.contactObj).subscribe((response: { success: number, message: string }) => {
        if (response.success == 1) {
         
          this.enquiry = false
          Swal.fire("Thank You for Contacting!", "Our team members will be in touch with you shortly!");
          this.router.navigate(["/collections"]);
        }
        this.isLoading = false
      })
    }
    // }
  }

  handleTab(tabName) {
    this.tab = tabName;
  }

  handleAcc(name: string): void {
    if (this.accName === name) {
      this.accName = null;
    } else {
      this.accName = name;
    }
  }



  handleBrochure() {
    this.enquiry = true;
    this.contactObj.brochure = 1;
  }

  closeEnquiry() {
    this.enquiry = false;
  }

  jumpBig(index) {
    this.mainSwiper.directiveRef.setIndex(index);
  }

  jumpThumb(slide) {

    this.secondarySwiper.directiveRef.setIndex(slide);
    $("#secondarySwiper").find(".swiper-slide").removeClass("swiper-slide-active");
    $("#secondarySwiper").find(".swiper-slide:nth-child("+(slide+1)+")").addClass("swiper-slide-active");
    
  }

  getFlooring() {
    this.service.getFlooring().subscribe((response: { success: number, message: string, items: [] }) => {
      if (response.success == 1) {
        this.flooringList = response.items
        console.log(this.flooringList)
      }
    })
  }

  convertToNumber(value: string): number {
    return Number(value);
  }
}
