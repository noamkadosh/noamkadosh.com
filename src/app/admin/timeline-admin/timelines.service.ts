import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Crud } from "../../shared/crud";

import { TimelineItem } from "./timeline-item.model";

@Injectable({
  providedIn: "root",
})
export class TimelinesService extends Crud<TimelineItem, string> {
  addToUI = new Subject<TimelineItem>();
  deleteFromUI = new Subject<TimelineItem>();
  
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/timeline");
  }
}
