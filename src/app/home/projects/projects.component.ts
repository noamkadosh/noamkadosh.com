import { Component, OnInit } from '@angular/core';

import { GithubService } from './github.service';
import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects!: Project[];

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.githubService.findAll()
      .subscribe(
        projects => {
          this.projects = projects.sort((x, y) => x.updated_at < y.updated_at ? 1 : -1);
        }
      );
  }
}
