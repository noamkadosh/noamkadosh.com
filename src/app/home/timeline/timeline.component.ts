import { Component, OnInit } from '@angular/core';
import { TimelineItem } from 'src/app/admin/timeline-admin/timeline-item.model';
import { TimelinesService } from 'src/app/admin/timeline-admin/timelines.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  timelines!: TimelineItem[];

  constructor(private timelinesService: TimelinesService) { }

  ngOnInit(): void {
    this.timelinesService.findAll()
    .subscribe(timelines => {
      this.timelines = timelines;
    });
  }
}
