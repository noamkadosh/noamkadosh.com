import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Crud } from "src/app/shared/crud";

import { Tweet } from "./tweet.model";

@Injectable({
  providedIn: "root",
})
export class TwitterService extends Crud<Tweet, string> {
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/twitter");
  }
}
