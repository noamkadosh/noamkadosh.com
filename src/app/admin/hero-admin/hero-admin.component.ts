import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { HeroService } from "./hero.service";
import { Hero } from "./hero.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: "app-hero-admin",
  templateUrl: "./hero-admin.component.html",
  styleUrls: ["./hero-admin.component.scss"],
  animations: [
    trigger("toggleAdminMenu", [
      state(
        "closed",
        style({
          transform: "scaleY(0)",
          height: '0px'
        })
      ),
      state(
        "open",
        style({
          transform: "scaleY(1)",
          height: '*'
        })
      ),
      transition("closed <=> open", [animate("0.5s ease")]),
    ]),
  ]
})
export class HeroAdminComponent implements OnInit {

  isAdminMenuClicked: boolean = false;
  hero: Hero = new Hero();
  isLoading: boolean = false;

  constructor(private heroService: HeroService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.heroService.findAll()
    .subscribe(hero => {
      this.hero = hero[0];
    });
  }

  toggleAdminMenu() {
    this.isAdminMenuClicked = !this.isAdminMenuClicked;
  }

  // onSubmit method that saves the content
  onSubmit(form: NgForm) {
    if (!form.touched) {
      this.errorService.display(ErrorComponent, { message: 'Please make changes.', isSuccess: false });
      return;
     }
    this.isLoading = true;
    const newHero = new Hero(form.value.title, form.value.subtitle, this.hero._id);
    this.heroService.update(this.hero._id, newHero).subscribe((response) => {
      this.hero = newHero;
      this.errorService.display(ErrorComponent, { message: response.msg, isSuccess: true });
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
    });
  }
}
