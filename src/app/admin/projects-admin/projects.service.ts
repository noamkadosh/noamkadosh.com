import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Crud } from "../../shared/crud";

import { ProjectSettings } from "./project-settings.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends Crud<ProjectSettings, string> {
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/project-settings");
  }
}
