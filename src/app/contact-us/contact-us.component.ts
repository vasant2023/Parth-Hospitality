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
    if(this.isLoading == false){
      this.isLoading = true;

      this.service.submitContactForm(this.contactObj).subscribe((response : {success:number, message:string}) => {
        if(response.success == 1){
          Swal.fire("Thank You for contacting!", "success");
          this.router.navigate(["/items"]);
        }
        this.isLoading = false
      })
    }
  }

}
