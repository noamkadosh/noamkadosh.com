import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { SkillsService } from "./skills.service";
import { Skill } from "./skill.model";

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.scss'],
  animations: [
    trigger("toggleAdminMenu", [
      state(
        "closed",
        style({
          transform: "scaleY(0)",
          height: '0px'
        })
      ),
      state(
        "open",
        style({
          transform: "scaleY(1)",
          height: '*'
        })
      ),
      transition("closed <=> open", [animate("0.5s ease")]),
    ]),
  ]
})
export class SkillsAdminComponent implements OnInit {

  skills!: Skill[];
  isAdminMenuClicked: boolean = false;

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService.findAll()
    .subscribe(skills => {
      this.skills = skills;
    });
    this.skillsService.addToUI.subscribe(skill => {
      this.skills.push(skill);
    });
    this.skillsService.deleteFromUI.subscribe(skill => {
      this.skills = this.skills.filter(({ _id }) => _id !== skill._id);
    });
  }

  toggleAdminMenu() {
    this.isAdminMenuClicked = !this.isAdminMenuClicked;
  }
}
