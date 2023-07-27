import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/_services/service.service';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {

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

  // getCollectionDetails(){
  //   this.collectionId = this.route.snapshot.params['collection_ID'];

  //   if(this.collectionId){
  //     this.service.getCollectionDetails(this.collectionId).subscribe((response : {success: number, message: string, collection:[]}) => {
  //       if(response.success == 1){
  //         this.collectionDetail = response.collection;

  //         this.collectionDetail.items.forEach((individualItem) => {
  //           this.hardwareArray.push(individualItem.hardwares)
  //         });

  //         this.collectionDetail.items.forEach((individualLaminate) => {
  //           this.laminateArray.push(individualLaminate.laminate)
  //         })

  //         this.flatArrayHardware = this.hardwareArray.flat();
  //         this.flatArrayLaminates = this.laminateArray.flat();
  //         console.log(this.flatArrayLaminates);
  //       }
  //     })
  //   }
  // }

  getCollectionDetails() {
    this.collectionId = this.route.snapshot.params['collection_ID'];

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


}
