import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/admin/contact-admin/contact.model';
import { ContactService } from 'src/app/admin/contact-admin/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact: Contact = {
    _id: '',
    contact_title: '',
    contact_text: ''
  };

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.findAll()
    .subscribe(about => {
      this.contact = about[0];
    });
  }

}
