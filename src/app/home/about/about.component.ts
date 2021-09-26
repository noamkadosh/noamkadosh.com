import { Component, OnInit } from "@angular/core";

import { About } from "src/app/admin/about-admin/about.model";
import { AboutService } from "src/app/admin/about-admin/about.service";
import { IsMobileService } from "../../shared/services/is-mobile.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent implements OnInit {
  about: About = {
    _id: '',
    text: '',
    bold_text: ''
  };
  mobileQuery: MediaQueryList;

  constructor(private aboutService: AboutService, private isMobileService: IsMobileService) {
    this.mobileQuery = isMobileService.mobileQuery;
  }

  ngOnInit(): void {
    this.aboutService.findAll()
    .subscribe(about => {
      this.about = about[0];
    });
  }
}
