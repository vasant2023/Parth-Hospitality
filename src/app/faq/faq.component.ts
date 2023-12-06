import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.css"],
})
export class FAQComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public faqs_tab_f = "";

  faqstab(tab) {
    if (this.faqs_tab_f == tab) {
      this.faqs_tab_f = "";
    } else {
      this.faqs_tab_f = tab;
    }
  }
}
