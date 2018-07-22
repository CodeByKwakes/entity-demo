import { ActivatedRouteSnapshot, Router, ActivationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadClient } from './core/store/client.actions';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store, private router: Router) {
    this.store.dispatch(new LoadClient());
    this.getCurrentUrlSnapshot().subscribe(data => console.log('data', data));
  }

  private getCurrentUrlSnapshot(): Observable<ActivatedRouteSnapshot> {
    return this.router.events
      .pipe(
        filter((event: Event) => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot.firstChild),
        filter((event: ActivatedRouteSnapshot) => event !== null && event.data !== undefined)
      );
  }
}
