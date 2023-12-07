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

  public isLoading:boolean = false;
  blog_list: any = [];
  remaining_blog_list: any = [];

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs(){
    this.isLoading = true;
    this.service.getBlogs().subscribe((response : {success: number, message: string, blogs:[]}) => {
      if(response.success == 1){
        this.blog_list = response.blogs;
        if(this.blog_list.length > 0){
          this.remaining_blog_list = this.blog_list.slice(1);
        }
      } else {

      }
      this.isLoading =false;
    })
  }

}
