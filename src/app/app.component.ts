import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadClient } from './core/store/client.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store) {
    this.store.dispatch(new LoadClient());
  }
}
