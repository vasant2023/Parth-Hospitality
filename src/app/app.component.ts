import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ServiceService } from './_services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    public service: ServiceService,
    private route :ActivatedRoute,

  ){
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        window.scrollTo(0, 0);

      }
    });
  }

  ngOnInit(){
    this.menuCollection();
  }

  menuList:any= [];
  title = 'Parth-Hospitality';

  menuCollection(){
    this.service.menuCollection().subscribe((response: {success:number, message:string, categories:[]}) => {
      if(response.success == 1){
        this.menuList = response.categories;
        console.log(this.menuList);
      }
    })
  }
}
