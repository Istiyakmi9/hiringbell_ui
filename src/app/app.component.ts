import { Component } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
} from "@angular/router";
import { Subscription } from 'rxjs';
import { CommonService } from 'src/providers/common.service';
import { iNavigation } from 'src/providers/iNavigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'hiringbell-ui';
  pageName: string = "";
  activePage:number = 0;
  navRouter: Subscription = null;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private nav: iNavigation,
  ) {
    this.GetScreenHeight();
    this.navRouter = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.pageName = event.url.replace("/", "")
        this.commonService.SetCurrentPageName(this.pageName);
        this.nav.manageLocalSessionKey(this.pageName);
        this.nav.pushRoute(this.pageName);
      }
    });
  }

  GetScreenHeight() {
    var width = 0,
      height = 0;
    if (typeof window.innerWidth == "number") {
      //Non-IE
      width = window.innerWidth;
      height = window.innerHeight;
    } else if (
      document.documentElement &&
      (document.documentElement.clientWidth ||
        document.documentElement.clientHeight)
    ) {
      //IE 6+ in 'standards compliant mode'
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
    } else if (
      document.body &&
      (document.body.clientWidth || document.body.clientHeight)
    ) {
      //IE 4 compatible
      width = document.body.clientWidth;
      height = document.body.clientHeight;
    }
    this.commonService.SetWindowdDetail(height, width);
  }
}
