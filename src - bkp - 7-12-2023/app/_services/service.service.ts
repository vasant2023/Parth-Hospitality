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

  getItems(data) {
    const url = environment.apiUrl + "items/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    // body = body.append("flag", "all");
    body = body.append("search", data.search);
    body = body.append("page", data.PageIndex);
    body = body.append("limit", data.PageSize);
    body = body.append("slug", data.slug);
    // body = body.append("collection_ID", data.collection_ID);
    // body = body.append("category_ID", data.category_ID);

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

  getLaminates(data) {
    const url = environment.apiUrl + "laminates/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");
    body = body.append("page", data.PageIndex);
    body = body.append("limit", data.PageSize);

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

  getHotelWiseCollection(hotel_slug){
    const url = environment.apiUrl + 'categories/collection_list';
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append('apiId', apiId);
    body = body.append('slug', hotel_slug);

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
    // console.log(contactObj);
    // return false
    const url = environment.apiUrl + "leads/lead-add";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");
    body = body.append("name", contactObj.name);
    body = body.append("type", contactObj.type);
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
    body = body.append("items", contactObj.item_IDs);
    body = body.append("laminates", contactObj.laminate_IDs);
    body = body.append("floorings", contactObj.flooring_IDs);
    body = body.append("addons", contactObj.addons_IDs);


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

  getFlooring(){
    const url = environment.apiUrl + "items/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("category_ID", '53');

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  menuCollection(){
    const url = environment.apiUrl + "categories/list_nested";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all")
    body = body.append("type", 'hotel');

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }


  item_categories(){
    const url = environment.apiUrl + "categories/list_nested";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all")
    body = body.append("type", 'item');

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  // Blogs

  getBlogs() {
    const url = environment.apiUrl + "blogs/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("flag", "all");

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  getBlogDetails(slug){
    const url = environment.apiUrl + "blogs/details";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);
    body = body.append("slug", slug);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }

  // Home Page Banners

  getHomePageBanners(){
    const url = environment.apiUrl + "home-banners/list";
    const apiId = environment.apiId;

    let body = new HttpParams();
    body = body.append("apiId", apiId);

    let httpHeaders = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(url, body, { headers: httpHeaders });
  }
}

