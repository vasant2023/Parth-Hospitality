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
  selector: 'app-channel-partner',
  templateUrl: './channel-partner.component.html',
  styleUrls: ['./channel-partner.component.css']
})
export class ChannelPartnerComponent implements OnInit {


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
