import { Component, OnInit } from "@angular/core";

import { Hero } from "../../admin/hero-admin/hero.model";
import { HeroService } from "../../admin/hero-admin/hero.service";
import { IsMobileService } from "../../shared/services/is-mobile.service";

@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"],
})
export class HeroComponent implements OnInit {
  hero: Hero = {
    _id: '',
    title: '',
    subtitle: ''
  };
  mobileQuery: MediaQueryList;

  constructor(private heroService: HeroService, private isMobileService: IsMobileService) {
    this.mobileQuery = isMobileService.mobileQuery;
  }

  ngOnInit(): void {
    this.heroService.findAll()
    .subscribe(hero => {
      this.hero = hero[0];
    });
  }
}
