import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpEventType,
} from "@angular/common/http";
import { Observable, of, BehaviorSubject, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { map, catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  // private objservableuser = new Subject<any>();

  constructor(private http: HttpClient) { }

  // Items

  getItems() {
    const url = environment.apiUrl + "items/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getItemcategories(){
    const url = environment.apiUrl + 'categories/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'item');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Laminates

  getLaminates() {
    const url = environment.apiUrl + "laminates/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getLaminatecategories(){
    const url = environment.apiUrl + 'categories/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'laminate');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Collection

  getCollection(){
    const url = environment.apiUrl + 'collections/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  getCollectioncategories(){
    const url = environment.apiUrl + 'categories/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'collection');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  getCollectionDetails(slug){
    const url = environment.apiUrl + 'collections/details';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('slug', slug);

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Hardwares

  getHardwares() {
    const url = environment.apiUrl + "hardwares/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getHardwarecategories(){
    const url = environment.apiUrl + 'categories/list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('flag', "all");
    body = body.append('type', 'hardware');

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
   });
   return this.http.post(url, body, { headers: httpHeaders });
  }

  // Brands

  getBrands() {
    const url = environment.apiUrl + "brands/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  // Contact form

  submitContactForm(contactObj){
    const url = environment.apiUrl + "leads/lead-add";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");
    body = body.append("name", contactObj.name);
    body = body.append("email", contactObj.email);
    body = body.append("phone", contactObj.phone);
    body = body.append("message", contactObj.message);
    body = body.append("company_name", contactObj.company_name);
    body = body.append("city", contactObj.city);
    body = body.append("state", contactObj.state);
    body = body.append("zip_code", contactObj.zip_code);
    body = body.append("country", contactObj.country);
    body = body.append("property_code", contactObj.property_code);
    body = body.append("rooms", contactObj.rooms);
    body = body.append("collection_id", contactObj.collection_id);
    body = body.append("brochure", contactObj.brochure);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  // Countries

  getCountries(){
    const url = environment.apiUrl + "countries";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getStates(country){
    const url = environment.apiUrl + "states";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("country_id", country);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getCities(state){
    const url = environment.apiUrl + "cities";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("state_id", state);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }
}
