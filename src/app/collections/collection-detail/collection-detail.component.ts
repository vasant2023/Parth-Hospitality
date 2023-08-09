import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  @ViewChild('mainSwiper', {static:false}) mainSwiper: SwiperComponent;
  @ViewChild('secondarySwiper', {static:false}) secondarySwiper: SwiperComponent;


  collectionObj:any = {
    collection_id: "",
    name: ""
  }

  contactObj:any = {
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
    collection_id : this.collectionObj.collection_id
  }

  public productImageSwiper: SwiperConfigInterface = {
    spaceBetween: 10,
    slidesPerView: 3,
    loop: true,
    freeMode: false,
    // loopedSlides: 5,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    centeredSlides: true
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
  };

  public mainImageSwiper: SwiperConfigInterface = {
    spaceBetween: 16,
    slidesPerView: 1,
    loop: true,
    freeMode: false,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
  };


  isLoading = false;
  public tab = "productSpecification";
  public accName = 'construction';
  enquiry = false

  createContactForm: FormGroup;

  constructor(
      public service: ServiceService,
      private route :ActivatedRoute,
      private router: Router
  ) { }

  collectionSlug = ""
  collectionDetail:any;
  // imageSrc = "assets/images/specifications/1.jpg";

  ngOnInit() {
    this.getCollectionDetails();
    this.getCountries()
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  hardwareArray:any=[]
  flatArrayHardware:any=[];
  countries:any=[];
  states:any=[];
  cities:any=[];

  dummyImages:any = [
    "assets/images/specifications/1.jpg",
    "assets/images/specifications/2.jpg",
    "assets/images/specifications/3.jpg",
  ]

  laminateArray:any=[];
  flatArrayLaminates:any=[];

  getCountries(){
    this.service.getCountries().subscribe((response: {success:number , message:string, data:[]}) => {
      console.log(response)
      if(response.success == 1){
        this.countries = response.data;
        console.log(this.countries)
      }
    })
  }

  loadStates(country){
    console.log(country)
    if(country){
      this.service.getStates(country).subscribe((response : {success:number, message:string, data:[]}) => {
        if(response.success == 1){
          this.states = response.data;
          // console.log(this.states)
        } else {
          console.log(response.message)
        }
      })
    }
  }

  loadCities(state){
    if(state){
      this.service.getCities(state).subscribe((response : {success:number, message:string, data:[]}) => {
        if(response.success == 1){
          this.cities = response.data;
          // console.log(this.cities)
        } else {
          console.log(response.message)
        }
      })
    }
  }

  getCollectionDetails() {
    this.collectionSlug = this.route.snapshot.params['slug'];
    this.contactObj.collection_id = this.collectionSlug

    if (this.collectionSlug) {
      this.service.getCollectionDetails(this.collectionSlug).subscribe((response: { success: number, message: string, collection: [] }) => {
        this.collectionObj = response.collection
        this.contactObj.collection_id = this.collectionObj.collection_ID;
        // this.contactObj.collectionName = this.collectionObj.collection
        // console.log(this.contactObj.collection_id ,this.contactObj.collectionName)


        if (response.success == 1) {
          this.collectionDetail = response.collection;
          // console.log(this.collectionDetail)

          this.collectionDetail.items.forEach((individualItem) => {
            this.hardwareArray.push(individualItem.hardwares);
          });

          this.collectionDetail.items.forEach((individualLaminate) => {
            this.laminateArray.push(individualLaminate.laminate);
          });

          this.flatArrayHardware = this.hardwareArray.flat();
          this.flatArrayLaminates = this.laminateArray.flat();

          // Remove duplicates from flatArrayHardware
          this.flatArrayHardware = this.flatArrayHardware.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.hardware === item.hardware
          ))
          );

          // Remove duplicates from flatArrayLaminates
          this.flatArrayLaminates = this.flatArrayLaminates.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.laminate === item.laminate
          ))
          );
        }
      })
    }
  }

  submitContactForm(form){
    console.log(form.valid)
    if(form.valid){

      console.log(this.contactObj, "Contact object");
      // return false;
      if(this.isLoading == false){
        this.isLoading = true;

        this.service.submitContactForm(this.contactObj).subscribe((response : {success:number, message:string}) => {
          if(response.success == 1){
            Swal.fire("Thank You for contacting!", "success");
            this.router.navigate(["/collections"]);
          }
          this.isLoading = false
        })
      }
    }
  }

  handleTab(tabName){
    this.tab = tabName;
  }

  handleAcc(name: string): void {
    if (this.accName === name) {
      this.accName = null;
    } else {
      this.accName = name;
    }
  }

  handleEnquiry(){
    this.enquiry = true;
  }

  closeEnquiry(){
    this.enquiry = false;
  }

  jumpBig(index){
    this.mainSwiper.directiveRef.setIndex(index);
  }

  jumpThumb(slide) {
    console.log(slide);
    this.secondarySwiper.directiveRef.setIndex(slide);
  }


}
