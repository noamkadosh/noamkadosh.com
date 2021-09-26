import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Crud } from "../../shared/crud";

import { Quote } from "./quote.model";

@Injectable({
  providedIn: "root",
})
export class QuoteService extends Crud<Quote, string> {
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/quote");
  }
}
