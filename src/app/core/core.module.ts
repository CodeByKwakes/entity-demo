import { RouterState } from './store/router.state';
import { ClientState } from './store/client.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';


@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      ClientState,
      RouterState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  declarations: []
})
export class CoreModule { }
