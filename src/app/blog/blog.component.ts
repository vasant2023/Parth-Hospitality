import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ServiceService } from "../_services/service.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(
    public service: ServiceService
  ) { }

  blog_list: any = [];

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(){
    this.service.getBlogs().subscribe((response : {success: number, message: string, blogs:[]}) => {
      if(response.success == 1){
        this.blog_list = response.blogs;
      } else {

      }
    })
  }

}
