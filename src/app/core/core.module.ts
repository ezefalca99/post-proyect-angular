import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import {HttpService} from './http.service';
import {TokensService} from './tokens.service';


@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  declarations: [

  ],
  exports: [

  ],
  entryComponents: [

  ],
  providers: [
    HttpService,
    TokensService
  ]
})
export class CoreModule {
}
