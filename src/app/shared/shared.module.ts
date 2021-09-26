import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveDashPipe } from './pipes/remove-dash.pipe';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { ToDatePipe } from './pipes/to-date.pipe';
import { ScrollingAnimationDirective } from './directives/scrolling-animation.directive';
import { ScrollingAnimation2Directive } from './directives/scrolling-animation-2.directive';
import { GradientScrollingAnimationDirective } from './directives/gradient-scrolling-animation.directive';
import { ShinyDirective } from './directives/shiny.directive';
import { HookDirective } from './directives/hook.directive';
import { SpaceToDashPipe } from './pipes/space-to-dash.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ErrorComponent } from './components/error/error.component';
import { RemoveDotPipe } from './pipes/remove-dot.pipe';

@NgModule({
  declarations: [
    RemoveDashPipe,
    RemoveUnderscorePipe,
    ToDatePipe,
    ScrollingAnimationDirective,
    ScrollingAnimation2Directive,
    GradientScrollingAnimationDirective,
    ShinyDirective,
    HookDirective,
    SpaceToDashPipe,
    SpinnerComponent,
    ErrorComponent,
    RemoveDotPipe
  ],
  imports: [
    CommonModule,
    NgxPageScrollModule
  ],
  exports: [
    RemoveDashPipe,
    RemoveUnderscorePipe,
    ToDatePipe,
    ScrollingAnimationDirective,
    ScrollingAnimation2Directive,
    GradientScrollingAnimationDirective,
    ShinyDirective,
    HookDirective,
    SpaceToDashPipe,
    SpinnerComponent,
    NgxPageScrollModule,
    ErrorComponent,
    RemoveDotPipe
  ]
})
export class SharedModule { }
