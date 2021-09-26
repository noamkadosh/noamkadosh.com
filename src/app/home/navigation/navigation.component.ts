import { Component, HostListener } from "@angular/core";
import { AnimationEvent } from "@angular/animations";
import { IsNotFoundService } from "../../pagenotfound/is-not-found.service";
import { IsMobileService } from "../../shared/services/is-mobile.service";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.scss"],
  animations: [
    trigger("changeColor", [
      state(
        "transparent",
        style({
          backgroundColor: "transparent",
        })
      ),
      state(
        "colored",
        style({
          backgroundColor: "rgba(29, 29, 31, 0.72)",
        })
      ),
      transition("transparent <=> colored", [
        animate("0.5s cubic-bezier(0.28, 0.11, 0.32, 1)"),
      ])
    ]),
    trigger("animateTopBar", [
      state(
        "closed",
        style({
          transform: "none",
        })
      ),
      state(
        "animating",
        style({
          transform: "translate(0, 3px)",
        })
      ),
      state(
        "open",
        style({
          transform: "rotate(45deg) translate(2.517px, 2.517px)",
        })
      ),
      transition("closed => animating", [
        animate(".1008s cubic-bezier(0.04, 0.04, 0.12, 0.96)"),
      ]),
      transition("animating => closed", [
        animate(".1008s cubic-bezier(0.04, 0.04, 0.12, 0.96)"),
      ]),
      transition("* => *", [
        animate(".3192s cubic-bezier(0.04, 0.04, 0.12, 0.96)"),
      ]),
    ]),
    trigger("animateBottomBar", [
      state(
        "closed",
        style({
          transform: "none",
        })
      ),
      state(
        "animating",
        style({
          transform: "translate(0, -4px)",
        })
      ),
      state(
        "open",
        style({
          transform: "rotate(-45deg) translate(2.517px, -2.517px)",
        })
      ),
      transition("closed => animating", [
        animate(".1008s cubic-bezier(0.04, 0.04, 0.12, 0.96)"),
      ]),
      transition("open => animating", [
        animate(".1008s cubic-bezier(0.04, 0.04, 0.12, 0.96)"),
      ]),
      transition("* => *", [
        animate(".3192s cubic-bezier(0.04, 0.04, 0.12, 0.96)"),
      ]),
    ]),
    trigger("toggleMobileMenu", [
      state(
        "closed",
        style({
          transform: "scaleY(0)",
        })
      ),
      state(
        "open",
        style({
          transform: "scaleY(1)",
        })
      ),
      transition("closed <=> open", [animate("0.5s ease")]),
    ]),
  ],
})
export class NavigationComponent {
  links = [
    "home",
    "about",
    "projects",
    "timeline",
    "skills",
    "social-media",
    "contact",
  ];
  accounts = [
    {
      url: "https://www.linkedin.com/in/noamkadosh/",
      icon: "./assets/icons/linkedin.svg",
    },
    {
      url: "https://github.com/noamkadosh",
      icon: "./assets/icons/github.svg",
    },
    {
      url: "https://twitter.com/Noam_Kadosh",
      icon: "./assets/icons/twitter.svg",
    },
  ];
  isScrolled: boolean = false;
  isNotFound: boolean = false;
  mobileQuery: MediaQueryList;
  isMobileMenuClicked: boolean = false;
  mobileMenuButtonState = "closed";

  constructor(
    private isNotFoundService: IsNotFoundService,
    private isMobileService: IsMobileService
  ) {
    this.mobileQuery = isMobileService.mobileQuery;
  }

  ngOnInit(): void {
    this.isNotFoundService.isNotFoundObservable.subscribe(
      (data) => (this.isNotFound = data)
    );
  }

  toggleMobileMenu() {
    this.isMobileMenuClicked = !this.isMobileMenuClicked;
    this.mobileMenuButtonState = "animating";
  }

  animateMobileMenu($event: AnimationEvent) {
    if ($event.fromState == "closed") {
      this.mobileMenuButtonState = "open";
    }
    if ($event.fromState == "open") {
      this.mobileMenuButtonState = "closed";
    }
  }

  @HostListener("window:scroll")
  scrollEvent() {
    this.isScrolled = window.pageYOffset > 0;
  }
}
