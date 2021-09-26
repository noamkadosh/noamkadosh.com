import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Crud } from "../../shared/crud";

import { TwitterSettings } from "./twitter-settings.model";

@Injectable({
  providedIn: 'root'
})
export class TwitterSettingsService extends Crud<TwitterSettings, string> {
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/twitter-settings");
  }
}
