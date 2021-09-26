import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { IsNotFoundService } from './is-not-found.service'

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PageNotFoundComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading: boolean = true;

  constructor(private isNotFoundService: IsNotFoundService) { }

  ngOnInit(): void {
    this.isNotFoundService.pageNotFound();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    this.isNotFoundService.pageNotFound();
  }
}
