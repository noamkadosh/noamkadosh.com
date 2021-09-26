import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/admin/skills-admin/skill.model';
import { SkillsService } from 'src/app/admin/skills-admin/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skills!: Skill[];

  constructor(private skillsService: SkillsService) { }

  ngOnInit(): void {
    this.skillsService.findAll()
    .subscribe(skills => {
      this.skills = skills;
    });
  }
}
