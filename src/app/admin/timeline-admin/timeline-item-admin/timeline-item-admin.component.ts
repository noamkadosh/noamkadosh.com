import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { TimelinesService } from "../timelines.service";
import { TimelineItem } from "../timeline-item.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: 'app-timeline-item-admin',
  templateUrl: './timeline-item-admin.component.html',
  styleUrls: ['./timeline-item-admin.component.scss'],
  animations: [
    trigger("toggleMenu", [
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
export class TimelineItemAdminComponent implements OnInit {

  isItemClicked: boolean = false;
  @Input() addMode: boolean = false;
  @Input() timeline: TimelineItem = new TimelineItem('', '', '', '', '', 1991);
  isLoading: boolean = false;

  constructor(private timelinesService: TimelinesService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isItemClicked = !this.isItemClicked;
  }

  // onSubmit method that saves the content
  onSubmit(form: NgForm) {
    if (!form.touched) {
      this.errorService.display(ErrorComponent, { message: 'Please make changes.', isSuccess: false });
      return;
     }
    this.isLoading = true;
    if (this.addMode) {
     const newTimeline = new TimelineItem(
      form.value.role,
      form.value.company,
      form.value.description,
      form.value.link,
      form.value.badge,
      form.value.year
     );
     this.timelinesService.save(newTimeline).subscribe(response => {
      if (response !== null && response._id) {
       newTimeline._id = response._id;
       this.timelinesService.addToUI.next(newTimeline);
       this.errorService.display(ErrorComponent, { message: response.msg, isSuccess: true });
       form.reset();
      } else {
        this.errorService.display(ErrorComponent, { message: 'Invalid input.', isSuccess: false });
      }
       this.isLoading = false;
     },
     err => {
       this.isLoading = false;
     });
    } else {
     const newTimeline = new TimelineItem(
       form.value.role,
       form.value.company,
       form.value.description,
       form.value.link,
       form.value.badge,
       form.value.year,
       this.timeline._id
      );
     this.timelinesService.update(this.timeline._id!, newTimeline).subscribe(response => {
      this.timeline = newTimeline
      this.errorService.display(ErrorComponent, { message: response.msg, isSuccess: true });
      this.isLoading = false;
     },
     err => {
       this.isLoading = false;
     });
    }
 }

 onDelete() {
  this.isLoading = true;
     this.timelinesService.delete(this.timeline._id!).subscribe(response => {
       this.timelinesService.deleteFromUI.next(this.timeline);
       this.errorService.display(ErrorComponent, { message: response.msg, isSuccess: true });
       this.isLoading = false;
     },
     err => {
       this.isLoading = false;
     });
 }
}
