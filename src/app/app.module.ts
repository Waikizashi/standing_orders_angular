import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { StandingOrdersListComponent } from './standing-order/list/standing-orders-list.component';
import { StandingOrderFormComponent } from './standing-order/form/standing-order-form.component';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ConstantSymbolTableDialogComponent } from './shared/dialogs/constant-symbols/constant-symbol-table-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    StandingOrdersListComponent,
    StandingOrderFormComponent,
    ConstantSymbolTableDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 10000,
        panelClass: ['service-snackbar']
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
