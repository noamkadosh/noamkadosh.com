import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { TwitterSettingsService } from "./twitter-settings.service";
import { TwitterSettings } from "./twitter-settings.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: "app-social-media-admin",
  templateUrl: "./social-media-admin.component.html",
  styleUrls: ["./social-media-admin.component.scss"],
  animations: [
    trigger("toggleAdminMenu", [
      state(
        "closed",
        style({
          transform: "scaleY(0)",
          height: "0px",
        })
      ),
      state(
        "open",
        style({
          transform: "scaleY(1)",
          height: "*",
        })
      ),
      transition("closed <=> open", [animate("0.5s ease")]),
    ]),
  ],
})
export class SocialMediaAdminComponent implements OnInit {
  isAdminMenuClicked: boolean = false;
  twitterSettings: TwitterSettings = new TwitterSettings();
  isLoading: boolean = false;

  constructor(private twitterSettingsService: TwitterSettingsService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.twitterSettingsService.findAll().subscribe((twitterSettings) => {
      this.twitterSettings = twitterSettings[0];
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
    const newTwitterSettings = new TwitterSettings(form.value.tweet_count, this.twitterSettings._id);
    this.twitterSettingsService
      .update(this.twitterSettings._id, newTwitterSettings)
      .subscribe(response => {
        this.twitterSettings = newTwitterSettings;
        this.errorService.display(ErrorComponent, { message: response.msg, isSuccess: true });
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      });
  }
}
