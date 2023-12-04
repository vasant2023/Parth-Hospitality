import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from "@angular/router";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { ServiceService } from '../_services/service.service';
import Swal from "sweetalert2";
import {
  SwiperModule,
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperComponent,
} from "ngx-swiper-wrapper";

@Component({
  selector: 'app-channel-partner',
  templateUrl: './channel-partner.component.html',
  styleUrls: ['./channel-partner.component.css']
})
export class ChannelPartnerComponent implements OnInit {
  @ViewChild('mainSwiper', { static: false }) mainSwiper: SwiperComponent;


  public channelPartnerSwiper: SwiperConfigInterface = {
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


  contactObj:any = {
    type:"",
    name: "",
    email: "",
    phone: "",
    message: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  }

  public channelPartnerData:any =  [
    {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "concenience",
    "content_1_name": "One-stop-shop for all range of products",
    "content_2_name": "Need to reach out to various vendors for different products",
    "image_name": "assets/images/icons/channel-partner-icons/concenience.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "Quality",
    "content_1_name": "Standard material Extensive quality checks",
    "content_2_name": "Compromised quality to cut costs Absolutely zero quality checks",
    "image_name": "assets/images/icons/channel-partner-icons/Quality.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "warranty",
    "content_1_name": "Industry best & transparent warranty policies",
    "content_2_name": "No warranty",
    "image_name": "assets/images/icons/channel-partner-icons/warranty.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "after sales support",
    "content_1_name": "Dedicated Team 100% Our responsibility",
    "content_2_name": "No after sales support",
    "image_name": "assets/images/icons/channel-partner-icons/after-sales-supprt.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "delivery assistance",
    "content_1_name": "Delivery & installation will be done by us",
    "content_2_name": "Delivery Hassles",
    "image_name": "assets/images/icons/channel-partner-icons/delivery-assistance.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "Product Conductivity",
    "content_1_name": "Guaranteed product continuity",
    "content_2_name": "Challenged product continuity",
    "image_name": "assets/images/icons/channel-partner-icons/Product-Conductivity.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "brand",
    "content_1_name": "Brand awareness, as it makes selling at ease",
    "content_2_name": "No Brand",
    "image_name": "assets/images/icons/channel-partner-icons/brand.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "Pricing",
    "content_1_name": "Standard & competitive pricing No hidden costs",
    "content_2_name": "Fluctuating seasonal pricing",
    "image_name": "assets/images/icons/channel-partner-icons/Pricing.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "Design",
    "content_1_name": "Planning, prototyping, evaluating & designing by expert & qualified designers",
    "content_2_name": "Generally from a picture/image",
    "image_name": "assets/images/icons/channel-partner-icons/Design.svg"
  },
  {
    "hospitality1" : "Parth Furniture",
    "hospitality2" : "Traditional Manufacture",
    "title_name": "Delivery",
    "content_1_name": "Standard time-frame committed at the time of placing the order",
    "content_2_name": "Unrealistic, due to lack of commitment/experience",
    "image_name": "assets/images/icons/channel-partner-icons/Delivery.svg"
  }
]





  isLoading = false;

  createContactForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public service: ServiceService
  ) { }

  ngOnInit() {
    this.getCountries();
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


  getCountries() {
    this.service.getCountries().subscribe((response: { success: number, message: string, data: [] }) => {
      if (response.success == 1) {
        this.countries = response.data;
      }
    })
  }

  loadStates(country) {
    if (country) {
      this.service.getStates(country).subscribe((response: { success: number, message: string, data: [] }) => {
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
 
  submitContactForm(form){
    if(form.valid){
      this.contactObj.type = 'channel_partner';
    if(this.isLoading == false){
      this.isLoading = true;
 
      this.service.submitContactForm(this.contactObj).subscribe((response : {success:number, message:string}) => {
        if(response.success == 1){
          Swal.fire("Thank You for contacting!", "success");
          this.contactObj = {};
        }
        this.isLoading = false
      })
    }
    }
    
  }

}
