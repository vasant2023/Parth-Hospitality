import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactObj: any = {
    name: "",
    email: "",
    phone: "",
    message: "",
    company_name: "",
    country_code:"1",
    city: "",
    state: "",
    zip_code: "",
    country: "231",
    property_code: "",
    rooms: "",
    flag:"us"
  }

  isLoading = false;

  countries: any = [];

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

  public country_code_clickF = false;
  country_code_click() {
    this.country_code_clickF = !this.country_code_clickF;
  }

  country_code_click_false() {
    this.country_code_clickF = false;
  }

  country_click_career(id, phonecode, flag) {
    this.contactObj.country = id;
    this.contactObj.country_code = phonecode;
    this.contactObj.flag = flag;
    this.country_code_clickF = false;
  }

  closeCountry() {
    this.country_code_clickF = false
  }

  getCountries() {
    this.service.getCountries().subscribe((response: { success: number, message: string, data: [] }) => {
      if (response.success == 1) {
        this.countries = response.data;
        this.filteredCountries = this.countries;
      }
    })
  }

  public searchPhoneCode:any = "";
  public filteredCountries:any = []

  filterCountries(value: string){
    this.searchPhoneCode = value;
    if(this.searchPhoneCode !== ''){
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(this.searchPhoneCode.toLowerCase()) ||
        country.phonecode.includes(this.searchPhoneCode)
      );

    } else {
      this.filteredCountries = this.countries
    }
  }

  toSmallerCase(country){
    return country.toLowerCase();
  }



  submitContactForm(form) {
    // this.contactObj.country = '91';
    this.contactObj.type = 'contact';
    if(form.valid){
      if (this.isLoading == false) {
        this.isLoading = true;
        this.service.submitContactForm(this.contactObj).subscribe((response: { success: number, message: string }) => {
          if (response.success == 1) {
            Swal.fire({
              icon: "success",
              title: "Thank You for Contacting.",
              text: "Our team members will be in touch with you shortly!",
            });
            this.contactObj = {};
            this.contactObj.country = "91";
            this.router.navigate(["/"]);

          }
          this.isLoading = false
        })
      }
    }
  }



}
