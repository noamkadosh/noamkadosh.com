import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Crud } from "src/app/shared/crud";

import { Project } from "./project.model";

@Injectable({
  providedIn: "root",
})
export class GithubService extends Crud<Project, string> {
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/github");
  }
}
