import { Component, OnInit } from "@angular/core";
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"],
})
export class FAQComponent implements OnInit {
  constructor(
    public titleService: Title,
  ) {}

  ngOnInit() {}

  public faqs_tab_f:any = "";

  faqstab(tab) {
    if (this.faqs_tab_f == tab) {
      this.faqs_tab_f = "";
    } else {
      this.faqs_tab_f = tab;
    }
  }
}
