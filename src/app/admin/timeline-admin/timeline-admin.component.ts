import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { TimelinesService } from "./timelines.service";
import { TimelineItem } from "./timeline-item.model";

@Component({
  selector: 'app-timeline-admin',
  templateUrl: './timeline-admin.component.html',
  styleUrls: ['./timeline-admin.component.scss'],
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
export class TimelineAdminComponent implements OnInit {

  timelines!: TimelineItem[];
  isAdminMenuClicked: boolean = false;

  constructor(private timelinesService: TimelinesService) { }

  ngOnInit(): void {
    this.timelinesService.findAll()
    .subscribe(timelines => {
      this.timelines = timelines;
    });
    this.timelinesService.addToUI.subscribe(timeline => {
      this.timelines.push(timeline);
    });
    this.timelinesService.deleteFromUI.subscribe(timeline => {
      this.timelines = this.timelines.filter(({ _id }) => _id !== timeline._id);
    });
  }

  toggleAdminMenu() {
    this.isAdminMenuClicked = !this.isAdminMenuClicked;
  }
}
