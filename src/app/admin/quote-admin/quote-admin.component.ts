import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { QuoteService } from "./quote.service";
import { Quote } from "./quote.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: 'app-quote-admin',
  templateUrl: './quote-admin.component.html',
  styleUrls: ['./quote-admin.component.scss'],
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
export class QuoteAdminComponent implements OnInit {

  isAdminMenuClicked: boolean = false;
  quote: Quote = new Quote();
  isLoading: boolean = false;

  constructor(private quoteService: QuoteService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.quoteService.findAll()
    .subscribe(quote => {
      this.quote = quote[0];
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
    const newQuote = new Quote(form.value.quote, this.quote.author = form.value.author, this.quote._id);
    this.quoteService.update(this.quote._id!, newQuote).subscribe(response => {
      this.errorService.display(ErrorComponent, { message: response.msg, isSuccess: true });
      this.quote = newQuote;
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
    });
  }
}
