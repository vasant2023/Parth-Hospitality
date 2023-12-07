import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/_services/service.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  public blogObj:any = {}

  constructor(
    public service: ServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getBlogId();
    this.getBlogDetails();
  }

  blogId = ""
  getBlogId(){
    this.blogId = this.route.snapshot.params['blog_slug'];
  }

  getBlogDetails(){
    this.service.getBlogDetails(this.blogId).subscribe((response:any) => {
      if(response.success == 1){
        this.blogObj = response.blog
      }
    })
  }

}
