import { Component, Input, OnInit, ChangeDetectionStrategy } from 'angular2/core';
import { RouterLink } from 'angular2/router';

import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TrimPipe } from '../shared/pipes/trim.pipe';
import { AuthService } from '../shared/services/auth.service';
import { ICustomer } from '../shared/interfaces';
import { IUserSecurity } from '../shared/interfaces';
import { TrackerService } from '../shared/services/tracker.service';

@Component({ 
  selector: 'customers-card', 
  templateUrl: 'app/customers/customersCard.component.html',
  directives: [RouterLink],
  pipes: [CapitalizePipe, TrimPipe],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class CustomersCardComponent implements OnInit {

  @Input() customers: ICustomer[] = [];
  user: IUserSecurity;
  
  constructor(private authService: AuthService, private tracker: TrackerService) { }
  
  ngOnInit() {
      this.user = this.authService.user;
  }

}

