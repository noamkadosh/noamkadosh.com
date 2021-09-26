import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { TwitterComponent } from './social-media/twitter/twitter.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { QuoteComponent } from './quote/quote.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineItemComponent } from './timeline/timeline-item/timeline-item.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillComponent } from './skills/skill/skill.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SocialMediaComponent,
    TwitterComponent,
    FooterComponent,
    ContactComponent,
    QuoteComponent,
    TimelineComponent,
    TimelineItemComponent,
    SkillsComponent,
    SkillComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavigationComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SocialMediaComponent,
    TwitterComponent,
    FooterComponent,
    ContactComponent,
    QuoteComponent,
    TimelineComponent,
    TimelineItemComponent,
    SkillsComponent,
    SkillComponent
  ]
})
export class HomeModule { }
