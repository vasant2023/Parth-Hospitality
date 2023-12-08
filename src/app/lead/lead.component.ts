import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
// import { NgWizardConfig, NgWizardService, StepChangedArgs, STEP_STATE, THEME } from 'ng-wizard';
import { style } from '@angular/animations';



@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  // stepStates = {
  //   normal: STEP_STATE.normal,
  //   disabled: STEP_STATE.disabled,
  //   error: STEP_STATE.error,
  //   hidden: STEP_STATE.hidden
  // };

  // config: NgWizardConfig = {
  //   selected: 0,
  //   theme: THEME.arrows,
  //   toolbarSettings: {
  //     toolbarExtraButtons: [
  //       { text: 'Submit', class: 'btn btn-info', event: () => { this.submitContactForm() } }
  //     ],
  //   }
  // };


  collectionObj: any = {
    collection_id: "",
    name: "",
    laminates:[],
    addons:[],
    items:[],

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

 
  isLoading = false;
  // isWizardOpen = false;
  public tab = "productSpecification";
  public accName = 'Construction';
  sizeSpecificationItems: any = [];
  flooringList: any = []

  createContactForm: FormGroup;

  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
    // private ngWizardService: NgWizardService,

  ) {
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }



  collectionSlug = ""
  collectionDetail: any = {
    items: [],
    addons:[]

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

  public country_code_clickF:boolean = false;
  country_code_click() {
    this.country_code_clickF = !this.country_code_clickF
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
    this.collectionSlug = this.route.snapshot.params['slug'];
    this.contactObj.collection_id = this.collectionSlug
    this.contactObj.country = '91';


    if (this.collectionSlug) {
      this.service.getCollectionDetails(this.collectionSlug).subscribe((response: { success: number, message: string, collection: {} }) => { 
        this.contactObj.collection_id = this.collectionObj.collection_ID;
        if (response.success == 1) {
          this.collectionObj = response.collection
          this.collectionDetail = response.collection;
          this.sizeSpecificationItems = this.collectionDetail.items;

          console.log(this.sizeSpecificationItems, "items");
        }
      })
    }
  }

  submitContactForm(form) {
    if(form.valid){
      if (this.isLoading == false) {
        this.isLoading = true;
        var phone = this.contactObj.phone;
        this.contactObj.phone = this.contactObj.country + " " + phone;
        
        this.service.submitContactForm(this.contactObj).subscribe((response: { success: number, message: string }) => {
          if (response.success == 1) {
  
          
  
  
            Swal.fire("Thank You for Contacting!", "Our team members will be in touch with you shortly!");
            this.router.navigate(["/collections"]);
          }
          this.isLoading = false
        })
      }
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

  // handleEnquiry() {
  //   this.isWizardOpen = true;
  // }

  // handleBrochure() {
  //   this.enquiry = true;
  //   this.contactObj.brochure = 1;
  // }

  // closeEnquiry() {
  //   this.enquiry = false;
  // }

  // closeWizard() {
  //   this.isWizardOpen = false
  // }

  // jumpBig(index) {
  //   this.mainSwiper.directiveRef.setIndex(index);
  // }

  // jumpThumb(slide) {
  //   this.secondarySwiper.directiveRef.setIndex(slide);
  // }


  // Wizard Functions

  // showPreviousStep(event?: Event) {
  //   this.ngWizardService.previous();
  // }

  // showNextStep(event?: Event) {
  //   this.ngWizardService.next();
  // }

  // resetWizard(event?: Event) {
  //   this.ngWizardService.reset();
  // }

  // setTheme(theme: THEME) {
  //   this.ngWizardService.theme(theme);
  // }

  // stepChanged(args: StepChangedArgs) {
  //   // console.log(args.step);
  // }

  isValidTypeBoolean: boolean = true;

  // isValidFunctionReturnsBoolean(args: StepValidationArgs) {
  //   return true;
  // }

  // isValidFunctionReturnsObservable(args: StepValidationArgs) {
  //   return of(true);
  // }

  exampleCHange() {
  }

  getFlooring() {
    this.service.getFlooring().subscribe((response: { success: number, message: string, items: [] }) => {
      if (response.success == 1) {
        this.flooringList = response.items
        console.log(this.flooringList)
      }
    })
  }


  public is_form_click_f = "contact_detail";
  public tab_index:any = "1";
  formtabclick(tab, tabIndex) {
    this.is_form_click_f = tab;
    this.tab_index = tabIndex
  }


  manageNext(){
    this.tab_index = parseInt(this.tab_index) + 1;

    if(this.tab_index == 1){
      this.is_form_click_f = 'contact_detail';
    } else if(this.tab_index == 2){
      this.is_form_click_f = 'select_items';
    } else if(this.tab_index == 3){
      this.is_form_click_f = 'select_laminates';
    } else if(this.tab_index == 4){
      this.is_form_click_f = 'select_flooring';
    } else if(this.tab_index == 5){
      this.is_form_click_f = 'select_add_on';
    }
    
  }
  managePrevious(){
    this.tab_index = parseInt(this.tab_index) - 1;
    if(this.tab_index == 1){
      this.is_form_click_f = 'contact_detail';
    } else if(this.tab_index == 2){
      this.is_form_click_f = 'select_items';
    } else if(this.tab_index == 3){
      this.is_form_click_f = 'select_laminates';
    } else if(this.tab_index == 4){
      this.is_form_click_f = 'select_flooring';
    } else if(this.tab_index == 5){
      this.is_form_click_f = 'select_add_on';
    }
  }

  

}
