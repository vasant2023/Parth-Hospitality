import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from './_services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router,
    public service: ServiceService,
  ){}

  title = 'Parth-Hospitality';
}
