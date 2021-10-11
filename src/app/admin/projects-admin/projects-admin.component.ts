import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

import { ProjectsService } from "./projects.service";
import { ProjectSettings } from "./project-settings.model";
import { ErrorComponent } from "src/app/shared/components/error/error.component";
import { ErrorService } from "src/app/shared/services/error.service";

@Component({
  selector: 'app-projects-admin',
  templateUrl: './projects-admin.component.html',
  styleUrls: ['./projects-admin.component.scss'],
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
export class ProjectsAdminComponent implements OnInit {
  isAdminMenuClicked: boolean = false;
  projectSettings: ProjectSettings = new ProjectSettings();
  isLoading: boolean = false;

  constructor(private projectsService: ProjectsService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.projectsService.findAll()
      .subscribe(projectSettings => {
        this.projectSettings = projectSettings[0];
      });
  }

  toggleAdminMenu() {
    this.isAdminMenuClicked = !this.isAdminMenuClicked;
  }

   // onSubmit method that saves the content
   onSubmit(form: NgForm) {
    if (!form.touched) {
      this.errorService.display(ErrorComponent, { message: 'Please make changes.', isSuccess: false });
      return;
     }
    this.isLoading = true;
    const newProjectSettings = new ProjectSettings(form.value.project_count, this.projectSettings._id);
    this.projectsService.update(this.projectSettings._id, newProjectSettings).subscribe(response => {
      this.projectSettings = newProjectSettings;
      this.errorService.display(ErrorComponent, { message: response.msg, isSuccess: true });
      this.isLoading = false;
    },
    err => {
      this.isLoading = false;
    });
  }
}
