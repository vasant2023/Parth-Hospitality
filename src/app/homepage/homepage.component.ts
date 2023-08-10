import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public homeBannerSwiper: SwiperConfigInterface = {
    effect: 'fade',
    pagination: {
        el: ".swiper-pagination.swiper-pagination-home-banner",
    },
  };

  constructor(
    public router : Router
  ) { }

  ngOnInit() {
  }

  redirect(link){
    console.log(link);
    this.router.navigate(['/', link]);
  }
}
