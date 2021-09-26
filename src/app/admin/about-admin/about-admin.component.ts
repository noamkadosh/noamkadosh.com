import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { AboutService } from "./about.service";
import { About } from "./about.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: 'app-about-admin',
  templateUrl: './about-admin.component.html',
  styleUrls: ['./about-admin.component.scss'],
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
export class AboutAdminComponent implements OnInit {
  isAdminMenuClicked: boolean = false;
  about: About = {
    _id: '',
    text: '',
    bold_text: ''
  };
  isLoading: boolean = false;

  constructor(private aboutService: AboutService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.aboutService.findAll()
    .subscribe(about => {
      this.about = about[0];
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
    this.about.text = form.value.text;
    this.about.bold_text = form.value.bold_text;
    this.aboutService.update(this.about._id, this.about).subscribe(response => {
      this.errorService.display(ErrorComponent, { message: response.message, isSuccess: true });
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
    });
  }
}
