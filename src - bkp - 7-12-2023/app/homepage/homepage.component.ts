import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  SwiperModule,
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperComponent,
} from "ngx-swiper-wrapper";
import { ServiceService } from "../_services/service.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  public homeBannerSwiper: SwiperConfigInterface = {
    effect: "fade",
    // centeredSlides: true,
    fadeEffect: { crossFade: true },
    pagination: {
      el: ".swiper-pagination.swiper-pagination-home-banner",
    },
  };

  public homeProductSwiper: SwiperConfigInterface = {
    spaceBetween: 40,
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-homeproduct",
      prevEl: ".swiper-button-prev.swiper-button-prev-homeproduct",
    },
  };

  public clientsSwiper: SwiperConfigInterface = {
    slidesPerView: 5.3,
    spaceBetween: 120,
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-clients",
      prevEl: ".swiper-button-prev.swiper-button-prev-clients",
    },
    breakpoints: {
      1920: {
        slidesPerView: 5.3,
        spaceBetween: 120,
      },
      1440: {
        slidesPerView: 4.75,
        spaceBetween: 120,
      },
      1366: {
        slidesPerView: 4.75,
        spaceBetween: 90,
      },
      1280: {
        slidesPerView: 4.75,
        spaceBetween: 75,
      },
      1024: {
        slidesPerView: 4.75,
        spaceBetween: 60,
      },
      768: {
        slidesPerView: 4.25,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      428: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      430: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      390: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      375: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      360: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
      650: {
        slidesPerView: 2.25,
        spaceBetween: 15,
      },
    },
  };

  constructor(public router: Router, public service: ServiceService) {}

  ngOnInit() {
    this.getHomePageBanners();
    this.getCollection();
  }

  redirect(link) {
    console.log(link);
    this.router.navigate(["/", link]);
  }

  collection_list: any = [];
  bannerList: any = [];

  getCollection() {
    this.service
      .getCollection()
      .subscribe(
        (response: { success: number; message: string; collections: [] }) => {
          if (response.success == 1) {
            this.collection_list = response.collections;
          } else {
          }
        }
      );
  }

  getHomePageBanners() {
    this.service.getHomePageBanners().subscribe((response:any) => {
      if(response.success == 1){
        this.bannerList = response.banners;
      }
    })
  }

  convertToNumber(value: string): number {
    return Number(value);
  }
}
