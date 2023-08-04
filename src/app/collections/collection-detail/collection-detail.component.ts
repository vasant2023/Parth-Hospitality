import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

  contactObj:any = {
    name: "Vasant",
    email: "v@gmail.com",
    phone: "8160999033",
    message: "Collection Contact check",
    company_name: "Coronation",
    city: "Ahmedabad",
    state: "Gujarat",
    zip_code: "382424",
    country: "India",
    property_code: "1108",
    rooms: "11",
    collection_id : ""
  }

  isLoading = false;

  createContactForm: FormGroup;

  constructor(
      public service: ServiceService,
      private route :ActivatedRoute,
      private router: Router
  ) { }

  collectionId = ""
  collectionDetail:any;

  ngOnInit() {
    this.getCollectionDetails();
  }

  hardwareArray:any=[]
  flatArrayHardware:any=[];

  laminateArray:any=[];
  flatArrayLaminates:any=[];

  getCollectionDetails() {
    this.collectionId = this.route.snapshot.params['collection_ID'];
    this.contactObj.collection_id = this.collectionId

    if (this.collectionId) {
      this.service.getCollectionDetails(this.collectionId).subscribe((response: { success: number, message: string, collection: [] }) => {
        if (response.success == 1) {
          this.collectionDetail = response.collection;

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
          console.log(this.flatArrayLaminates);
        }
      })
    }
  }

  submitContactForm(){
    console.log(this.contactObj, "Contact object");
    return false;
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
