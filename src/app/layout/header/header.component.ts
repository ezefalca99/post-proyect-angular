import { Component, OnInit } from '@angular/core';
import { TokensService } from 'src/app/core/tokens.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: TokensService, private router: Router) {
  
  }
/*
  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationStart)).subscribe(x => {
      this.isAuth = this.authService.logIn();
      this.username = this.authService.getUsername();
    });
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
*/
  ngOnInit() {

  }
  

}
