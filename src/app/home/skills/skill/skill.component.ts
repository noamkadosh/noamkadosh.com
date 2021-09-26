import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/admin/skills-admin/skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() skill: Skill = {
    _id: '',
    name: '',
    rating: 1
  };

  constructor() { }

  ngOnInit(): void {
  }

}
