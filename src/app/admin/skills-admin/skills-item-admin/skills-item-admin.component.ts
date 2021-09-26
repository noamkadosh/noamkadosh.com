import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { SkillsService } from "../skills.service";
import { Skill } from "../skill.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: 'app-skills-item-admin',
  templateUrl: './skills-item-admin.component.html',
  styleUrls: ['./skills-item-admin.component.scss'],
  animations: [
    trigger("toggleMenu", [
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
export class SkillsItemAdminComponent implements OnInit {

  isItemClicked: boolean = false;
  @Input() addMode: boolean = false;
  @Input() skill: Skill = {
    _id: '',
    name: '',
    rating: 5
  };
  isLoading: boolean = false;

  constructor(private skillsService: SkillsService, private errorService: ErrorService) {}

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isItemClicked = !this.isItemClicked;
  }

   // onSubmit method that saves the content
   onSubmit(form: NgForm) {
     if (!form.touched) {
      this.errorService.display(ErrorComponent, { message: 'Please make changes.', isSuccess: false });
      return;
     }
    this.isLoading = true;
     if (this.addMode) {
      const newSkill = new Skill();
      newSkill.name = form.value.skill_name;
      newSkill.rating = form.value.skill_rating;
      this.skillsService.save(newSkill).subscribe(response => {
        if (response !== null && response._id) {
          newSkill._id = response._id;
          this.skillsService.addToUI.next(newSkill);
          this.errorService.display(ErrorComponent, { message: response.message, isSuccess: true });
          form.reset();
        } else {
          this.errorService.display(ErrorComponent, { message: 'Invalid input.', isSuccess: false });
        }
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      });
     } else {
      this.skill.name = form.value.skill_name;
      this.skill.rating = form.value.skill_rating;
      this.skillsService.update(this.skill._id, this.skill).subscribe(response => {
        this.errorService.display(ErrorComponent, { message: response.message, isSuccess: true });
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      });
     }
  }

  onDelete() {
    this.isLoading = true;
      this.skillsService.delete(this.skill._id).subscribe(response => {
        this.skillsService.deleteFromUI.next(this.skill);
        this.errorService.display(ErrorComponent, { message: response.message, isSuccess: true });
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      });

  }
}
