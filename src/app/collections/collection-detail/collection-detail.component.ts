import { Component, OnInit, ViewChild } from '@angular/core';
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
import { NgWizardConfig, NgWizardService, StepChangedArgs, STEP_STATE, THEME } from 'ng-wizard';
import { style } from '@angular/animations';


@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        { text: 'Submit', class: 'btn btn-info', event: () => { this.submitContactForm() } }
      ],
    }
  };

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


  public isLoading:boolean = false;
  isWizardOpen = false;
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
    private ngWizardService: NgWizardService,
  ) { }

  collectionSlug = ""
  collectionDetail: any = {
    items: [],
  }

  ngOnInit() {
    this.getCollectionDetails();
    this.getCountries();
    this.loadStates(101);
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

  loadStates(country) {
    if (country) {
      this.service.getStates(country).subscribe((response: { success: number, message: string, data: [] }) => {
        if (response.success == 1) {
          this.states = response.data;
          // console.log(this.states)
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
          // console.log(this.cities)
        } else {
          console.log(response.message)
        }
      })
    }
  }


  public country_code_clickF = false;
  country_code_click() {
    if (this.country_code_clickF) {
      this.country_code_clickF = false;
    } else {
      this.country_code_clickF = true;
    }
  }

  country_code_click_false() {
    this.country_code_clickF = false;
  }

  country_click_career(id) {
    this.contactObj.country = id;
    this.country_code_clickF = false;
  }



  getCollectionDetails() {
    this.isLoading = true;
    this.collectionSlug = this.route.snapshot.params['slug'];
    this.contactObj.collection_id = this.collectionSlug
    this.contactObj.country = '101';
    if (this.collectionSlug) {
      this.service.getCollectionDetails(this.collectionSlug).subscribe((response: { success: number, message: string, collection: {} }) => {
        this.collectionObj = response.collection
        console.log(this.collectionObj);
        this.contactObj.collection_id = this.collectionObj.collection_ID;


        if (response.success == 1) {
          this.collectionDetail = response.collection;
          this.sizeSpecificationItems = this.collectionDetail.items;

          // this.collectionDetail.items.forEach((individualItem) => {
          //   this.hardwareArray.push(individualItem.hardwares);
          // });

          // this.collectionDetail.items.forEach((individualLaminate) => {
          //   this.laminateArray.push(individualLaminate.laminate);
          // });

          // this.flatArrayHardware = this.hardwareArray.flat();
          // this.flatArrayLaminates = this.laminateArray.flat();

          // Remove duplicates from flatArrayHardware
          // this.flatArrayHardware = this.flatArrayHardware.filter((item, index, self) =>
          // index === self.findIndex((t) => (
          //   t.hardware === item.hardware
          // ))
          // );

          // Remove duplicates from flatArrayLaminates
          // this.flatArrayLaminates = this.flatArrayLaminates.filter((item, index, self) =>
          // index === self.findIndex((t) => (
          //   t.laminate === item.laminate
          // ))
          // );
        }

        this.isLoading = false;
      })
    }
  }



  submitContactForm() {
    // console.log(this.contactObj)
    // return false
    // if(form.valid){

    // console.log(this.contactObj, "Contact object");
    // return false;
    if (this.isLoading == false) {
      this.isLoading = true;

      this.service.submitContactForm(this.contactObj).subscribe((response: { success: number, message: string }) => {
        if (response.success == 1) {
          this.contactObj.phone = this.contactObj.country + " " + this.contactObj.phone;
          console.log(this.contactObj.phone);
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

  handleEnquiry() {
    this.isWizardOpen = true;
  }

  handleBrochure() {
    this.enquiry = true;
    this.contactObj.brochure = 1;
  }

  closeEnquiry() {
    this.enquiry = false;
  }

  closeWizard() {
    this.isWizardOpen = false
  }

  jumpBig(index) {
    this.mainSwiper.directiveRef.setIndex(index);
  }

  jumpThumb(slide) {
    this.secondarySwiper.directiveRef.setIndex(slide);
  }


  // Wizard Functions

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    // console.log(args.step);
  }

  isValidTypeBoolean: boolean = true;

  // isValidFunctionReturnsBoolean(args: StepValidationArgs) {
  //   return true;
  // }

  // isValidFunctionReturnsObservable(args: StepValidationArgs) {
  //   return of(true);
  // }

  exampleCHange() {
    // console.log(this.contactObj.addons_IDs, "Add ons")
    // console.log(this.contactObj.item_IDs, "items")
    // console.log(this.contactObj.laminate_IDs, "laminates")
    // console.log(this.contactObj.flooring_IDs, "flooring")
  }

  getFlooring() {
    this.service.getFlooring().subscribe((response: { success: number, message: string, items: [] }) => {
      if (response.success == 1) {
        this.flooringList = response.items
        console.log(this.flooringList)
      }
    })
  }

}
