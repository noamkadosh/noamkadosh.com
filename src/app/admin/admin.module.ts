import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminComponent } from './admin.component';
import { HeroAdminComponent } from './hero-admin/hero-admin.component';
import { AboutAdminComponent } from './about-admin/about-admin.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { ProjectsAdminComponent } from './projects-admin/projects-admin.component';
import { QuoteAdminComponent } from './quote-admin/quote-admin.component';
import { SkillsAdminComponent } from './skills-admin/skills-admin.component';
import { SocialMediaAdminComponent } from './social-media-admin/social-media-admin.component';
import { TimelineAdminComponent } from './timeline-admin/timeline-admin.component';
import { SkillsItemAdminComponent } from './skills-admin/skills-item-admin/skills-item-admin.component';
import { TimelineItemAdminComponent } from './timeline-admin/timeline-item-admin/timeline-item-admin.component';
import { NavigationAdminComponent } from './navigation-admin/navigation-admin.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminComponent,
    HeroAdminComponent,
    AboutAdminComponent,
    ContactAdminComponent,
    ProjectsAdminComponent,
    QuoteAdminComponent,
    SkillsAdminComponent,
    SocialMediaAdminComponent,
    TimelineAdminComponent,
    SkillsItemAdminComponent,
    TimelineItemAdminComponent,
    NavigationAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AdminModule { }
