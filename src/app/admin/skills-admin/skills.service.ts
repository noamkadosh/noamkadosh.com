import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Crud } from "../../shared/crud";

import { Skill } from "./skill.model";

@Injectable({
  providedIn: "root",
})
export class SkillsService extends Crud<Skill, string> {
  addToUI = new Subject<Skill>();
  deleteFromUI = new Subject<Skill>();
  
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/skills");
  }
}
