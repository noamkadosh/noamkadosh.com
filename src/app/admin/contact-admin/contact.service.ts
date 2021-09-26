import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Crud } from "../../shared/crud";

import { Contact } from "./contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService extends Crud<Contact, string> {
  constructor(protected http: HttpClient) {
    super(http, environment.API_URL + "/contact");
  }
}
