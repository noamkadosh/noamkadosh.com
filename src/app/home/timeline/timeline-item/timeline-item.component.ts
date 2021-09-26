import { Component, Input, OnInit } from '@angular/core';
import { TimelineItem } from 'src/app/admin/timeline-admin/timeline-item.model';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent implements OnInit {

  @Input() timeline: TimelineItem = {
    _id: '',
    role: '',
    company: '',
    description: '',
    link: '',
    badge: '',
    year: 1991
  };

  constructor() { }

  ngOnInit(): void {
  }

}
