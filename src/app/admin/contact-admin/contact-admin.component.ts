import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { ContactService } from "./contact.service";
import { Contact } from "./contact.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.scss'],
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
export class ContactAdminComponent implements OnInit {

  isAdminMenuClicked: boolean = false;
  contact: Contact = {
    _id: '',
    contact_title: '',
    contact_text: ''
  };
  isLoading: boolean = false;

  constructor(private contactService: ContactService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.contactService.findAll()
    .subscribe(contact => {
      this.contact = contact[0];
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
    this.contact.contact_title = form.value.contact_title;
    this.contact.contact_text = form.value.contact_text;
    this.contactService.update(this.contact._id, this.contact).subscribe(response => {
      this.errorService.display(ErrorComponent, { message: response.message, isSuccess: true });
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
    });
  }
}
