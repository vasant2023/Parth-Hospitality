import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public productImageSwiper: SwiperConfigInterface = {
    slidesPerView: 4.75,
    spaceBetween: 75,
    loop: false,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
