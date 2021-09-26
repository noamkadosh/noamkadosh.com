import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Crud } from "../../shared/crud";

import { Hero } from "./hero.model";

@Injectable({
  providedIn: "root",
})
export class HeroService extends Crud<Hero, string> {
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/hero");
  }
}
