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
    company_name: "",
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
  }
 
  submitContactForm(){
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
